$(document).ready(function() {

// Initialize inventory, room location, Meat Monster
roomIndex = 0;
redKey = 0;
redKeySeen = false;
greenKey = 0;
greenKeySeen = false;
screwdriver = 0;
screwdriverSeen = false;
flashlight = 0;
flashlightSeen = false;
hammer = 0;
hammerSeen = false;
spatula = 0;
meatMonster = 0;

// Outside Haunted Hamburger description 
describeRoom = ["You are standing outside of the Haunted Hamburger \
underneath a flickering sign with a giant smiling hamburger on top. The \
store has one window in front, and a rickety wooden front door to the North.",

//Main kitchen description
"You are in the main kitchen. There is a large grill covered in old grease. \
There is also a dead worker slumped against the wall. He has a sign hanging \
from his neck. The lobby is to the East, and there is another door to the North.",

//Lobby description
"You are in the lobby of the Haunted Hamburger. There is a \
long counter in the center of the room, with bar stools in front of it. There \
is also a free-standing cabinet in the corner. To the west, you see a darkened \
doorway, and to the right is a closed door.",

//Security guard room description
"You are in the security guard \
room. There are several security monitors and a desk with several items on it. \
The only exit is to West, back to the lobby.",

//Storage room description
"You are in a storage room. The room is empty except for a pile of rubbish in \
the corner of the room. There is a hallway leading to the East, and the door \
to the kitchen is to the South.",
        
//Hallway description
"You are in a long hallway. There are several pictures hanging from the walls. \
The storage room is back to the West, and there is another room to the East.",
        
//Office description
"You are in an office. There is a large desk in the center of the room. The boards \
of the floor are squeaky and feel loose. The hallway is back to the West \
and there is another room to the North.",

//Secret room (meat monster room) description
"You are in a secret room. The room's floor is littered with human skeletons. \
In the corner, a large Meat Monster is staring at you hungrily. \
There is an office room to the South, and another door to the West.",
        
//Central AC room description
"You are in the central heating and air room. In the center of the room is a \
large AC unit. There is a tool chest in the corner. There is also a large \
ventilation grate on the North wall. The secret room is to the East.",

//Magic Spatula room description
"You are in the ventilation shaft.\
Spinning around in mid-air with a fiery glow around it is the Magic Spatula."];

//Describe current room
$('#roomDescription').text(describeRoom[roomIndex]);

//Function to add inventory items to the inventory <div>
function inventory () {
    currentInventory = '';
    if (redKey === 1) {
        currentInventory += "Red Key<br>";
    };
    if (greenKey === 1) {
        currentInventory += "Green Key<br>";
    };
    if (screwdriver === 1) {
        currentInventory += "Screwdriver<br>";
     };
    if (hammer === 1) {
        currentInventory += "Hammer<br>";
    };
    if (flashlight === 1) {
        currentInventory += "Flashlight<br>";        
    };
    if (spatula === 1) {
        currentInventory += "Magic Spatula<br>";
    };
    if (currentInventory !== '') {
        $('#inventory').html('Things you have:<br>' + currentInventory);
    };
    if (currentInventory !== '') {
        $('#inventory').show();
    };
 };
 
//Function to count moves since user has seen meat monster and to end game
//when Meat Monster attacks
function meatMonsterCount () {
    if (meatMonster !== 0) {
        $('#meatMonster').show();
        meatMonster += 1;
        $('#meatMonster').text("The meat monster is following you.");
        if (meatMonster >= 22) {
            window.location.href = "gameoverlost.php";
        };
    } else {
        $('#meatMonster').hide();
    };
};

//Various functions to answer exception commands from user
function dontSee () {
    $('#answerCommand').text("You don't see that here.");
};

function cantDo () {
    $('#answerCommand').text("You can't do that here.");
};

function nothingSpecial () {
    $('#answerCommand').text("You see nothing special.");
    };

function missingSomething () {
    $('#answerCommand').text("You are missing something.");
};

//Hide unused <div>s at start of game
$('#answerCommand').hide();
$('#inventory').hide();
$('#meatMonster').hide();

//Form to accept user commands
$('#form').on('submit', function(e) {
    e.preventDefault();
    //Begin Meat Monster counter if necessary
    meatMonsterCount();
    
    //Convert command to lowercase
    $commandText = $('#command').val().toLowerCase();
    
    //Show the <div> to answer the user's command
    $('#answerCommand').show();
    
    //Get current inventory
    inventory();
    switch ($commandText) {
        case 'look window':
            if (roomIndex === 0) {
                $('#answerCommand').text('You see the lobby area. Looks creepy.');
            } else {
                dontSee();
            }
            break;
            
        case 'look worker':
            if (roomIndex === 1) {
                $('#answerCommand').text('The worker has been stabbed to death.');
            } else {
                dontSee();
            };
            break;
        
        case 'look sign':
        case 'read sign':
            if (roomIndex === 0) {
                $('#answerCommand').text("The sign says WELCOME TO HAUNTED \
                HAMBURGERS! FREE BOAT NECTAR FLAVORED STRAWBERRY MILKSHAKES \
                ON WEDNESDAYS!");
            } else if (roomIndex === 1) {
                 $('#answerCommand').text("It says WHOA! HEY! HOW'D THAT GET HERE?");
             } else {
                 dontSee();
             };
             break;
             
        case 'look cabinet':
        case 'open cabinet':
            if (roomIndex === 2) {
                if (greenKeySeen === false) {
                $('#answerCommand').text("There is a green key in the cabinet.");
                greenKeySeen = true;
            } else {
                nothingSpecial();
            };
            } else {
                dontSee();
            };            
            break;
            
        case 'get key':
        case 'take key':
            if (roomIndex === 2) {
                if (greenKeySeen === true && greenKey === 0) {
                    $('#answerCommand').text('You have the green key.');
                    greenKey = 1;
                    inventory();
                } else {
                    dontSee();
                };
            };
            if (roomIndex === 5) {
                if (redKeySeen === true && redKey === 0) {
                    $('#answerCommand').text('You have the red key.');
                    redKey = 1;
                    inventory();
                } else {
                    dontSee();
                };            
            };
            if (roomIndex !== 2 && roomIndex !== 5) {
                dontSee();
            };
            break;
            
        case 'get flashlight':
        case 'take flashlight':
            if (roomIndex === 3) {
                if (flashlightSeen === true && flashlight === 0) {
                    $('#answerCommand').text('You have the flashlight');
                    flashlight = 1;
                    inventory();
                } else {
                    dontSee();
                };
            } else {
                dontSee();
            };
            break;
            
        case 'look camera':
        case 'look cameras':
        case 'look monitor':
        case 'look monitors':
            if (roomIndex === 3 && meatMonster === 0) {
                $('#answerCommand').text('Most of the cameras show empty \
                rooms, but one camera shows a meat monster staring straight \
                at the camera.');
            } else if (roomIndex !== 3) {
                dontSee();
            };
            break;
            
        case 'look desk':
            if (roomIndex === 3){
                if (flashlight === 0) {
                $('#answerCommand').text('There is a flashlight on the desk');
                flashlightSeen = true;
            } else {
                nothingSpecial();
            };
            };
            if (roomIndex === 6) {
                nothingSpecial();
            };
            if (roomIndex !== 3 && roomIndex !== 6) {
                dontSee();
            };
            break;
        
        case 'look pile':
        case 'look rubbish':
            if (roomIndex === 4) {
                if (hammer === 0) {
                $('#answerCommand').text('There is a hammer hidden in the pile.');
                hammerSeen = true;
            } else {
                nothingSpecial();
            };
            } else {
                dontSee();
            };
            break;
            
        case 'get hammer':
        case 'take hammer':
            if (roomIndex === 4 && hammer === 0) {
                if (hammerSeen === true) {
                    $('#answerCommand').text('You have the hammer.');
                    hammer = 1;
                    inventory();
                } else {
                    dontSee();
                };
            } else {
                dontSee();
            };
            break;
            
        case 'move picture':
        case 'remove picture':
        case 'take picture':
        case 'get picture':
        case 'hit picture':
        case 'smash picture':        
            if (roomIndex === 5 ) {
                if (redKey === 0) {
                $('#answerCommand').text('You see a red key hanging behind the \
                picture.');
                redKeySeen = true;
            } else {
                $('#answerCommand').text('Nothing happens.');
            };
            } else {
                dontSee();
            };
            break;
            
        case 'look pictures':
        case 'look picture':
            if (roomIndex === 5) {
                $('#answerCommand').text('You see a picture of a llama wearing \
                a hat. It shows the llama holding a red key.');
            } else {
                dontSee();
            };
            break;
            
        case 'look floor':
        case 'look boards':
        case 'look board':
            if (roomIndex === 6) {
                $('#answerCommand').text('One of the boards is loose.');                
            } else {
                nothingSpecial();
            };
            break;
            
        case 'use hammer':
        case 'get board':
        case 'take board':
        case 'lift board':
            if (roomIndex === 6 && hammer === 1) {
                $('#answerCommand').text('There is a piece of paper under the \
                board. It says THE KEY IS BEHIND CARL.');
            } else {
                missingSomething();
            };
            if (roomIndex !== 6) {
                nothingSpecial();
            };
            break;
            
        case 'look monster':
            if (roomIndex === 7 || meatMonster > 0) {
                $('#answerCommand').text('It looks like it wants to eat you. \
                You had better hurry!');
            } else {
                dontSee();
            };
            break;
            
        case 'look tool':
        case 'look chest':
        case 'look toolchest':
            if (roomIndex === 8) {
                if (screwdriver === 0) {
                $('#answerCommand').text('There is a screwdriver in the chest.');
                screwdriverSeen = true;
            } else {
                $('#answerCommand').text('The chest is empty.');
            };
            } else {
                dontSee();
            };
            break;
        
        case 'get screwdriver':
        case 'take screwdriver':
            if (roomIndex === 8 && screwdriver === 0) {
                if (screwdriverSeen === true) {
                    $('#answerCommand').text('You have the screwdriver.');
                    screwdriver = 1;
                    inventory();
                } else {
                    dontSee();
                };
                } else {
                    dontSee();
                };
            break;
            
        case 'use screwdriver':
        case 'take screw':
        case 'get screw':
        case 'unscrew vent':
        case 'remove vent':
        case 'take vent':
        case 'open vent':
        case 'move vent':
        case 'open grate':
        case 'move grate':
        case 'take grate':
        case 'remove grate':
        case 'unscrew grate':
            if (roomIndex === 8 && screwdriver === 1) {
                $('#answerCommand').text('The vent is now open.');
                ventOpen = true;
            } else if (roomIndex === 8 && screwdriver === 0) {
                missingSomething();
            } else {
                dontSee();
            };
            break;
            
        case 'take spatula':
        case 'get spatula':
            if (roomIndex === 9 && spatula === 0) {
                $('#answerCommand').text('You have the Magic Spatula!');
            spatula = 1;
            inventory();
            } else {
                dontSee();
            };
            break;
        
        default:
            if ($commandText.indexOf('look') >= 0) {
                nothingSpecial();
            }
            else {
                cantDo();
            };           
    };
    $('#form')[0].reset();    
});

//Change rooms based on the user's click on a directional button
$('#north').on('click', function() {
    $('#answerCommand').hide();
    meatMonsterCount();
    inventory();
    switch (roomIndex) {
        case 0:
            roomIndex = 2;
            break;
            
        case 1:
            roomIndex = 4;
            break;
            
        case 6:
            if (redKey === 1) {
                roomIndex = 7;
                if (meatMonster === 0){
                    meatMonster = 1;
                };
            }
            else {
                $('#answerCommand').show();
                $('#answerCommand').text('The door is locked.');
            }
            break;
            
        case 8:
            if (ventOpen === true) {
                roomIndex = 9;}
            else {
                $('#answerCommand').show();
                $('#answerCommand').text('The vent cover blocks your way.');
            }
            break;
            
        default:
            $('#answerCommand').show();
            $('#answerCommand').text('You cannot go that way.');            
    };
    $('#roomDescription').text(describeRoom[roomIndex]);
});
$('#east').on('click', function() {
    meatMonsterCount();
    $('#answerCommand').hide();
    inventory();
    switch (roomIndex) {
        
        case 1:
            roomIndex = 2;
            break;
        
        case 2:
            if (greenKey === 1) {
                roomIndex = 3;
            }
            else {
                $('#answerCommand').show();
                $('#answerCommand').text('The door is locked.');
            };
            
            break;
            
        case 4:
            roomIndex = 5;
            break;
            
        case 5:
            roomIndex = 6;
            break;
            
        case 8:
            roomIndex = 7;
            break;
        
        default:
            $('#answerCommand').show();
            $('#answerCommand').text('You cannot go that way.');
            break;
    };  
    $('#roomDescription').text(describeRoom[roomIndex]);
});
$('#west').on('click', function () {
    meatMonsterCount();
    $('#answerCommand').hide();
    inventory();
    switch (roomIndex) {
        
        case 2:
            if (flashlight === 1) {
                roomIndex = 1;}
            else {
                $('#answerCommand').show();
                $('#answerCommand').text('You cannot go in there--\
                it is too dark.');};
            break;
            
        case 3:
            roomIndex = 2;
            break;
            
        case 5:
            roomIndex = 4;
            break;
            
        case 6:
            roomIndex = 5;
            break;
            
        case 7:
            roomIndex = 8;
            break;
        
        default:
            $('#answerCommand').show();
            $('#answerCommand').text('You cannot go that way.');
             break;           
       };
       $('#roomDescription').text(describeRoom[roomIndex]);
    });
$('#south').on('click', function() {
    //End the game if the user makes it out of the Haunted Hamburger with
    //the Magic Spatula in inventory
    if (roomIndex === 2 && spatula === 1) {
        window.location.href = "gameoverwon.php";
    };
    meatMonsterCount();
    $('#answerCommand').hide();
    inventory();
    switch (roomIndex) {
        case 2:
            roomIndex = 0;
            break;
            
        case 4:
            roomIndex = 1;
            break;
                        
        case 7:
            roomIndex = 6;
            break;
            
        case 9:
            roomIndex = 8;
            break;
            
        default:
            $('#answerCommand').show();
            $('#answerCommand').text('You cannot go that way.');
            break;        
    };
    $('#roomDescription').text(describeRoom[roomIndex]);
});
});
