<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Haunted Hamburger</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <div id="title">Haunted Hamburger</div><br>
        <div id="gameWindow">
        <div id="roomDescription"></div>
        <table id="moveButtons">
            <tr>
                <td></td>
                <td><button id="north">North</button></td>
                <td></td>
            </tr>
            <tr>
                <td><button id="west">West</button></td>
                <td></td>
                <td><button id="east">East</button></td>
            </tr>
            <tr>
                <td></td>
                <td><button id="south">South</button></td>
                <td></td>
            </tr>
        </table>
        <div id="meatMonster"></div><br>
        <div id="inventory"></div><br>
        <div id="answerCommand"></div><br>       
        <div id="control"></div><br>
        <form id="form">
            <label for="command">What do you want to do?</label><br>
            <input id="command" type="text" name="command"
                   placeholder="Your Command" />
            <input id="submit" type="submit" value="Go!" />
        </form>        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="javascript/gamescript.js"></script>
    </body>
</html>
