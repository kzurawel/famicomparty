+++
title = "14. Sprite Movement"
weight = 140
+++

In the last chapter, we created background graphics to display
behind our sprites. While the addition of backgrounds helps
make our game look more like an actual game, it is still
entirely static - no different from a still picture. In this
chapter, we'll look at how to move sprites around the screen.
To do so, we will need to make some changes to how our game
is drawing sprites.

First, we can no longer hard-code the positions of our sprites
in cartridge ROM.{% sidenote(id="cartridgerom") %}
As a reminder, "cartridge ROM" or PRG-ROM is the read-only part
of your game, and in the NES' memory map, it is located from
`$8000` to `$ffff`. All of your game's code is located there,
though your game code can refer to memory addresses outside
of PRG-ROM, like when we wrote sprite data to `$0200`-`$02ff`.
{% end %} There are many choices for where we could put our
sprite's information, but the best location is "zero-page RAM".

## Zero-Page RAM

A "page" of memory on the NES is a contiguous block of 256 bytes
of memory. For any memory address, the _high_ byte determines the
page number, and the _low_ byte determines the specific address
within the page. As an example, the range from `$0200` to `$02ff`
is "page `$02`", and the range from `$8000` to `$80ff` is
"page `$80`".

What, then, is "zero-page RAM"? Page zero is the range of memory
from `$0000` to `$00ff`. What makes page zero useful for things
like sprite positions is its speed. The 6502 processor has a
special addressing mode for working with zero-page RAM, which
makes operations on zero-page addresses much faster than the
same operation on other memory addresses. To use zero-page
addressing, use one byte instead of two when providing a memory
address. Let's look at an example:{% sidenote(id="zeropagemode") %}
Note that you _must_ use just one byte in order to take
advantage of zero-page addressing mode. The assembler does
not know anything about the memory addresses passing through
it. If you were to type `LDA $003b` instead of `LDA $3b`
in your assembly code, the resulting machine code would use
(slower) absolute mode, even though the memory address you are
loading from is located in page zero.
{% end %}

```ca65
  LDA $8000 ; "regular", absolute mode addressing
            ; load contents of address $8000 into A

  LDA $3b   ; zero-page addressing
            ; load contents of address $003b into A

  LDA #$3b  ; immediate mode addressing
            ; load literal value $3b into A
```

So, using zero-page addressing gives us very fast access to 256
bytes of memory. Those 256 bytes are the ideal place to store
values that your game will need to update or reference frequently,
making them an ideal place to record things like the current score,
the number of lives the player has, which stage or level the player
is in, and the positions of the player, enemies, projectiles, etc.{% sidenote(id="metatiles") %}
Notice that I said the position of "the player", and not the positions
of the individual tiles that make up the player. Any game that hopes
to have more than a very small number of objects on screen at one
time will need to carefully ration the use of zero-page addresses.
It is much more efficient to store an abstract "player position",
with a subroutine that can draw all the player's tiles in the
appropriate place given that position, than to store each individual
tile's coordinates.
{% end %}

## Using Page Zero Storage

Let's start using zero-page RAM in our code.
