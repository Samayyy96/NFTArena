// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GameUserMarketplace {
    // Mappings for user management
    mapping(address => string) public addressToUsername;
    mapping(string => address) public usernameToAddress;
    mapping(string => bool) public usernameExists;
    
    // Multiple usernames per address
    mapping(address => string[]) public addressToUsernames;
    
    // User profiles
    struct UserProfile {
        string username;
        uint256 xp;
        address owner;
        bool isListed;
        uint256 price;
    }
    
    mapping(string => UserProfile) public profiles;
    
    // Game sessions
    struct GameSession {
        address player1;
        address player2;
        uint256 stakeAmount;
        bool isActive;
        bool hasStake;
    }
    
    mapping(uint256 => GameSession) public gameSessions;
    uint256 public gameSessionCounter;
    
    // Events
    event UsernameRegistered(string username, address owner);
    event GameCreated(uint256 sessionId, address player1, uint256 stakeAmount);
    event PlayerJoined(uint256 sessionId, address player2);
    event GameEnded(uint256 sessionId, address winner, uint256 amount);
    event XPUpdated(string username, uint256 newXP);
    event ProfileListed(string username, uint256 price);
    event ProfileSold(string username, address oldOwner, address newOwner, uint256 price);
    
    // Modifiers
    modifier usernameNotExists(string memory _username) {
        require(!usernameExists[_username], "Username already exists");
        _;
    }
    
    modifier usernameOwner(string memory _username) {
        require(usernameToAddress[_username] == msg.sender, "Not username owner");
        _;
    }
    
    modifier validGameSession(uint256 _sessionId) {
        require(_sessionId < gameSessionCounter, "Invalid session ID");
        require(gameSessions[_sessionId].isActive, "Game session not active");
        _;
    }
    
    // Register a new username
    function registerUsername(string memory _username) external usernameNotExists(_username) {
        require(bytes(_username).length > 0, "Username cannot be empty");
        
        // If user already has a username, remove old mapping
        string memory oldUsername = addressToUsername[msg.sender];
        if (bytes(oldUsername).length > 0) {
            usernameExists[oldUsername] = false;
            delete usernameToAddress[oldUsername];
            delete profiles[oldUsername];
        }
        
        // Set new mappings
        addressToUsername[msg.sender] = _username;
        usernameToAddress[_username] = msg.sender;
        usernameExists[_username] = true;
        
        // Add to user's username list
        addressToUsernames[msg.sender].push(_username);
        
        // Create profile
        profiles[_username] = UserProfile({
            username: _username,
            xp: 0,
            owner: msg.sender,
            isListed: false,
            price: 0
        });
        
        emit UsernameRegistered(_username, msg.sender);
    }
    
    // Create a game session (with or without stake)
    function createGame(uint256 _stakeAmount) external payable returns (uint256) {
        if (_stakeAmount > 0) {
            require(msg.value == _stakeAmount, "Incorrect stake amount sent");
        }
        
        uint256 sessionId = gameSessionCounter++;
        gameSessions[sessionId] = GameSession({
            player1: msg.sender,
            player2: address(0),
            stakeAmount: _stakeAmount,
            isActive: true,
            hasStake: _stakeAmount > 0
        });
        
        emit GameCreated(sessionId, msg.sender, _stakeAmount);
        return sessionId;
    }
    
    // Join an existing game session
    function joinGame(uint256 _sessionId) external payable validGameSession(_sessionId) {
        GameSession storage session = gameSessions[_sessionId];
        require(session.player2 == address(0), "Game already has two players");
        require(session.player1 != msg.sender, "Cannot join your own game");
        
        if (session.hasStake) {
            require(msg.value == session.stakeAmount, "Incorrect stake amount");
        }
        
        session.player2 = msg.sender;
        if (session.hasStake) {
            session.stakeAmount *= 2; // Total pot is now both stakes
        }
        
        emit PlayerJoined(_sessionId, msg.sender);
    }
    
    // End game and declare winner (called by frontend/oracle)
    function endGame(uint256 _sessionId, address _winner, string memory _player1Username, uint256 _player1XP, string memory _player2Username, uint256 _player2XP) external validGameSession(_sessionId) {
        GameSession storage session = gameSessions[_sessionId];
        require(session.player2 != address(0), "Game needs two players");
        require(_winner == session.player1 || _winner == session.player2, "Invalid winner");
        
        session.isActive = false;
        
        // Transfer winnings if there was a stake
        uint256 winAmount = 0;
        if (session.hasStake && session.stakeAmount > 0) {
            winAmount = session.stakeAmount;
            payable(_winner).transfer(winAmount);
        }
        
        // Update XP for both players
        if (bytes(_player1Username).length > 0 && usernameToAddress[_player1Username] == session.player1) {
            profiles[_player1Username].xp = _player1XP;
            emit XPUpdated(_player1Username, _player1XP);
        }
        
        if (bytes(_player2Username).length > 0 && usernameToAddress[_player2Username] == session.player2) {
            profiles[_player2Username].xp = _player2XP;
            emit XPUpdated(_player2Username, _player2XP);
        }
        
        emit GameEnded(_sessionId, _winner, winAmount);
    }
    
    // List user profile in marketplace
    function listProfile(string memory _username, uint256 _price) external usernameOwner(_username) {
        require(_price > 0, "Price must be greater than 0");
        
        profiles[_username].isListed = true;
        profiles[_username].price = _price;
        
        emit ProfileListed(_username, _price);
    }
    
    // Remove profile from marketplace
    function unlistProfile(string memory _username) external usernameOwner(_username) {
        profiles[_username].isListed = false;
        profiles[_username].price = 0;
    }
    
    // Buy a user profile from marketplace
    function buyProfile(string memory _username) external payable {
        UserProfile storage profile = profiles[_username];
        require(profile.isListed, "Profile not for sale");
        require(msg.value == profile.price, "Incorrect payment amount");
        require(profile.owner != msg.sender, "Cannot buy your own profile");
        
        address oldOwner = profile.owner;
        
        // Remove old mappings
        addressToUsername[oldOwner] = "";
        
        // Set new mappings
        usernameToAddress[_username] = msg.sender;
        addressToUsername[msg.sender] = _username;
        
        // Add to new owner's username list
        addressToUsernames[msg.sender].push(_username);
        
        // Update profile
        profile.owner = msg.sender;
        profile.isListed = false;
        profile.price = 0;
        
        // Transfer payment to old owner
        payable(oldOwner).transfer(msg.value);
        
        emit ProfileSold(_username, oldOwner, msg.sender, msg.value);
    }
    
    // Get user's usernames
    function getUserUsernames(address _user) external view returns (string[] memory) {
        return addressToUsernames[_user];
    }
    
    // Get profile details
    function getProfile(string memory _username) external view returns (UserProfile memory) {
        return profiles[_username];
    }
    
    // Get game session details
    function getGameSession(uint256 _sessionId) external view returns (GameSession memory) {
        return gameSessions[_sessionId];
    }
    
    // Get listed profiles (helper function - you might want to implement pagination for large datasets)
    function isProfileListed(string memory _username) external view returns (bool, uint256) {
        UserProfile memory profile = profiles[_username];
        return (profile.isListed, profile.price);
    }
    
    // Emergency withdraw (only contract owner functionality can be added if needed)
    function emergencyWithdraw() external {
        // Add access control if needed
        payable(msg.sender).transfer(address(this).balance);
    }
    
    // Get contract balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}