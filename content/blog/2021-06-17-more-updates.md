+++
title = "Background Scrolling: Progress Update"
+++

Time for another update on progress. I'm getting a better
handle of how I want to approach background scrolling. Conceptually,
it's very simple: you figure out the X and Y offsets you want
to scroll to, and you write those numbers to an MMIO address.
But there's a lot surrounding that simple mechanism that needs
further exploration. We need to talk about camera systems
(i.e., deciding _when_ and _how much_ to scroll the screen),
using "scroll seams" to scroll across more than two nametables,
formats for storing background data to make them seam-friendly,
and how to handle things like status bars using split-screen
scrolling via "sprite 0 hit". It's a lot to cover, and I'm still
debating if it will all fit in a single chapter or not.

<!-- more -->

My plan for how to work all of this into the spaceship example
is to give our vertically-scrolling game a horizontal nametable
layout. That way, the status bar can be drawn in the second
nametable, since a horizontal split scroll is much easier
than a vertical split scroll. _Any_ vertical scroll will
then require using a seam and incrementally loading new
background content. I'm thinking of taking the "set decoration"
approach from _Super Mario Bros._ - a few screens worth of
repeating background content, with occasional modifications
layered on top. (Actually doing those modifications - and
creating a format to store them - will likely become its
own chapter.)

Given the scope of the chapter, I think it's going to take a
few more weeks before it's ready. I've read a lot about
seam scrolling in the past but I've never had to implement
it myself, so this will be a fun learning process for me.
Once background scrolling is finished, I think the next
important topic to tackle will be controller input. That
will provide the baseline for making "real" games.

As a total side tangent, I was recently gifted an NES! It's
the first time I've had one since I was a kid. I spent a little
time scouring eBay for good deals and I've built a small
collection of favorites. Sadly, the console itself doesn't
work with my TV yet - the seller believes it's a case of
bad A/V cables, but I'm fearful that the RF unit on the
motherboard will have to be re-capped. My new cables should
arrive early next week, so I'll find out soon.

"What games did you get?", you might be wondering. Here's
what I've picked up so far:

- Ducktales
- Super Mario Bros. / Duck Hunt (_much_ cheaper than _SMB_ alone)
- Super Mario Bros. 3
- Battletoads
- Dragon Warrior
- Zelda II: Adventure of Link
- Tetris
- Mega Man 2
- Bubble Bobble
- Chip 'n Dale: Rescue Rangers
