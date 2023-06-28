+++
title = "17. Collision Detection"
weight = 170
draft = true
+++

<!--
1. Collision detection defined, a posteriori detection and problems with it
Sidenote on speedruns and glitches from it
2. Mechanism - point v. rectangle, rectangle v. rectangle
3. Collision detection is expensive! Contra example. Break out of NMI!
4. More optimization: pools of sprites
Sidenote on flipping render order between frames (Mega Man 2)
5. Apply to the game
- Make some new sprites for enemies and lasers
- Make pressing a button fire a laser from pool
    - Set up zeropage to track lasers (4?)
- Add enemies randomly
    - Use zeropage for enemy location
- Detect laser/enemy collisions
6. Homework
- Track player score
- Use a pool of enemies / change enemy movement
- Implement player/enemy collisions
-->

After the last chapter, the player can now move their
ship around the screen, but there still isn't much for
them to do. To fix that, we'll need to add something
for the player's actions to interact with. The most
common way to do that is to give the player something
to bump into, whether with their on-screen character
(Mario jumping on a Goomba) or with some kind of weapon
(fireballs, swords, lasers, etc.).{% sidenote(id="backgrounds") %}
Detecting collisions
can also have less violent uses, like preventing
characters from walking through walls or telling a
makeshift physics engine when the player
is standing on the ground vs. falling into a bottomless
pit. (I guess that last one is a bit violent after all.)
Generally, though, these involve detecting collisions with
the background, as opposed to the sprite-to-sprite
collisions we will explore here. I'll come back to
background collisions in a later chapter.{% end %}
To know when two things in our game have hit one
another, we need to implement _collision detection_.

There are two broad approaches to collision detection.
The first, _a posteriori_, moves things in the game
and then checks after-the-fact if any of them collided.
The other is _a priori_ collision detection, which
takes the current motion of objects and extrapolates
into the future to find when (or if) they collide.
In most video games, _a posteriori_ detection is
used, because discovering whether or not two things are
overlapping at this exact moment is a far simpler
problem than knowing if two things might be
overlapping in the future. Computing power on the
NES is limited, and the less work the system needs
to do in the 16 milliseconds between frames, the better.
_A priori_ collision detection
is more commonly used in things like scientific
simulations, where displaying output in real-time
is not as important as accuracy in detecting collisions.

A related problem is which objects in a game
might collide with one another. If every object in
a game can potentially collide with every other object,
the number of possible collisions that need to be
checked each frame will quickly spiral out of control.
Again, there is only a limited amount of work that
the NES can do between frames, so approaches that
minimize the number of things that have to be
checked for collisions are preferred.

Once a collision is detected, a game needs to decide
what to do. This could be anything from stopping an
object's movement (walking into a wall),
lowering an object's health (getting hit by
enemies), removing an object from the game
(collecting a power-up item), or even bouncing
objects away from each other (a ball hitting
the paddle in Pong). Because movement has already
happened before we detect a collision, we sometimes
need to "fix" the movement of objects. If a character
can move four pixels per frame, but they were only
one pixel away from a wall before they started
moving, they might end up three pixels _inside_
that wall by the time we detect a collision.
The game will need to have logic to "eject"
the character from inside the wall, or else
serious bugs will result.{% sidenote(id="speedruns") %}
This kind of bug is frequently abused by
speedrunners. In _Super Mario Bros._, for
example, jumping into a brick wall at high
speed and at just the right angle can trick
the game's ejection algorithm into letting
the player run through it, saving precious time.
{% end %}

## Methods of detection

In modern game engines, there are a variety of
collision detection algorithms that can be used,
including axis-aligned bounding boxes ("AABB") or
using spheres in a 3d scene. On the NES, we need to
use a collision detection routine that can be performed
quickly with only basic math.
