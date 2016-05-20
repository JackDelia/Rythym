# Rythymania

Link to game: [RYTHYMANIA][game]

[game]: http://jackdelia.github.com/Rythym


## Description

Rythymania is a rhythm game inspired by Dance Dance Revolution. Try to hit the notes as they scroll up the screen to the tune of five different songs.

![ryth]

Try to beat your high scores over two different difficulty levels.

##Implementation Details


Rythymania is made using javascript, mainly the javascript canvas in order to properly draw the background video as well as scroll the notes up the screen with correct timing.

The videos are hosted on Cloudinary and played in the background to prerecorded song patterns. Easy mode was implemented using a custom algorithm to thin out the frequency of button presses in a deterministic fashion.

[ryth]: ./rythym.png
