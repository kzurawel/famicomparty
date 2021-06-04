+++
title = "Progress update"
+++

Time for another update on how things are going! The
past two weeks featured a lot of work on Chapter 14.
In order to have moving sprites, we need to make use
of zero-page RAM - which means I needed to write about
what page zero is and why you might want to use it.
(As a quick teaser, the designers of the 6502 thought
of zero-page RAM as an additional _256 registers_
for the programmer to make use of.)
To make the drawing efficient, at least from the
perspective of reusable, easy-to-read code, we also need
to learn to write subroutines - assembly's version
of what other programming languages would call "functions".
Subroutines have their own quirks and pitfalls, and
I'll briefly describe some of them in this chapter, but
some of it will have to wait until we start making heavier
use of the NMI handler.

<!-- more -->

All of this is to say that I hope to have Chapter 14
wrapped up within the next few days, at which point
we'll have a player ship on a starfield background that
automatically moves from left to right and back again.
I thought about including some basic "easing" to make
the ship animation more fluid, but this is already turning
into a long chapter and I think it would be better saved
for a later date. Once we have sprites moving, I think
the next chapter will be on background scrolling, which
should wrap up our deep dive into NES graphics (for now).
Then we'll take a look at how NES controllers work,
which will let us build things that seem a lot more like
"games".

On a more random note, I've decided to change the site's
font from [et-book](https://edwardtufte.github.io/et-book/)
to [Computer Modern](https://www.checkmyworking.com/cm-web-fonts/),
a.k.a. "the TeX font". It has a more "airy" feel and because
of its relatively large x-height, it seems easier to read.
Let me know if you disagree! I also made a few tweaks to
the code syntax highlighting color scheme that I hope
should have better contrast and fit better with the rest
of the site.
