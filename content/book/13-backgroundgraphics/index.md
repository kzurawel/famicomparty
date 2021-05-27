+++
title = "13. Background Graphics"
weight = 130
+++

Before we start animating sprites around the screen, I'd like to introduce
you to how background graphics work on the NES. We explored the mechanics
behind background graphics in [Chapter 9](@/book/09-theppu/index.md),
but in this chapter we'll look at the actual code required to display
backgrounds.

## The Background Pattern Table

First, you'll need graphical tiles in the background pattern table. The PPU
has two pattern tables for tiles, one for sprites and one for backgrounds.
In the previous chapters, we added some tiles to the sprite pattern table.
Now, we'll need to add tiles to the background table.

For this chapter, I've updated the CHR file to include some pre-made
background tiles. There are tiles for numbers and letters (to allow
us to display text to the player), solid-colored squares of each of
the four palette colors, and a few "starfield" tiles. You can view
(and edit) these tiles in NES Lightbox. Our long-term goal is going to be
the creation of a vertically-scrolling shooter game in the style of
_Star Soldier_.{% sidenote(id="star-soldier", img=["star_soldier.png", ""]) %}
_Star Soldier_, developed by Hudson Soft and released for the Famicom in 1986
and the NES in 1988, is a vertical-scrolling shooter series.
{% end %}

{% figure(img="starfieldchr.png") %}
The new background tiles in Bank B of "starfield.chr"
{% end %}

To make use of these new background tiles, we will need to write a nametable.
By default, the attribute table will be all zeroes, meaning that every
tile in the nametable will be drawn with the first palette. To use other
palettes, we will need to write an attribute table as well.

## Writing a Nametable

First, let's figure out where to put our new tiles in the nametable. We only
need to write to nametable addresses where we intend to place a tile &mdash;
everywhere else, the default background color from our palettes will be used.
In NES Lightbox, click a tile from the right side of the screen, then click
anywhere in the large area on the left to "draw" with the tile. Here is the
example background that we will use:

{% figure(img="starbackground.png") %}
Placing background tiles in NES Lightbox.
{% end %}

Once you have an arrangement that you like, you can save what you have so
far to a `.nam` file. From NES Lightbox's menus, select Nametables &rarr;
Save Nametable As..., then choose a filename and a location to save the file.
To reload your background later for editing, open NES Lightbox and select Nametables &rarr;
Open Nametable..., and select the `.nam` file you saved earlier.

When you hover over any tile in the large left pane, the status bar at the bottom
of NES Lightbox shows you useful information for writing nametables and attribute tables.
As discussed in [Chapter 9](/book/09-theppu/index.md), the NES has four
nametables, the first of which starts at PPU memory address `$2000`.
The bottom status bar of NES Lightbox shows the "nametable offset" and "attribute offset"
for each tile position &mdash; that is, how many bytes beyond the start of the
nametable or attribute table it is. To make things easier, it also shows the address
of the tile location in each nametable and attribute table.

{% figure(img="neslightbox-statusbar.png") %}
The bottom status bar of NES Lightbox, displaying nametable and
attribute table offsets and the corresponding PPU memory locations for
that offset in each of the four nametables and attribute tables.
{% end %}

We can use this information to fill out our nametable. As you might remember,
the nametable is just a series of tile numbers; palette selection occurs
in the attribute table. To create the nametable, we need to write the appropriate
tile number to each nametable address as displayed in NES Lightbox. Let's start with
the "large" star tile (tile number `$2f`, as you can see by
hovering over the tile in the right-side "Tileset" window and looking at the
status bar at the bottom of the application window). From hovering over
the places where the large star tile is used, we can see that we need to
write the value `$2f` to the following addresses in PPU memory:

- `$206b`
- `$2157`
- `$2223`
- `$2352`

The process is the same as what we have used before for palettes and
sprites: read from `PPUSTATUS`, write the address you want
to send data to to `PPUADDR` ("high"/left byte first, then
"low"/right byte), and then send the actual data to `PPUDATA`.
Previously, we have used loops to do this, taking advantage of the way
sequential writes to `PPUDATA` automatically increase the
address by one. This time, though, we need to write to totally non-linear
memory addresses, so we'll need to repeat the process in full for each
background tile. Here is the code to write the first "large star" to
the nametable:

```ca65, linenos, linenostart=46
  ; write a nametable
  ; big stars first
  LDA PPUSTATUS
  LDA #$20
  STA PPUADDR
  LDA #$6b
  STA PPUADDR
  LDX #$2f
  STX PPUDATA
```

The one thing we can do to save on the number of commands we need to enter
is to store the tile number in a different register from what we use
to read `PPUSTATUS` and write to `PPUADDR`; here
we are using the X register for the tile number, so that subsequent
writes of the same tile to the nametable will not require re-loading it.

We can use the same procedure to add the two varieties of "small" star
(`$2d` and `$2e`) to the nametable. To use different
colors for the tiles, we will need to write an attribute table as well.

## The Attribute Table

Background tile palettes are set via an attribute table, which uses one
byte to store palette information for a 4x4 square of background tiles.
To change the palettes used for a particular tile, first hover over that
tile in the left-side nametable display and note the "Attribute offset"
for the tile. Next, we need to figure out which 2x2 area of tiles
(top left, top right, bottom left, or bottom right) the tile we want
to change is part of. To help with finding the boundaries of an
attribute table byte, click "Attribute grid" at the bottom of the
nametable display. This will overlay a red dashed-line grid
that shows the boundaries of each 4x4 tile attribute table byte's
coverage area.

As an example, let's change the palette used to draw the first
"large star" in the nametable. By hovering over it in the nametable
viewer, we can find the attribute offset (`$02`), and by
looking at the attribute grid overlay we can see where within the 4x4
set of tiles our chosen tile is located (here, the bottom-right 2x2 area).

{% figure(img="findattributeoffset.png") %}
Finding attribute offset information for the "large star"
at the top of the nametable.
{% end %}

Each byte of the attribute table holds palette information for
four 2x2 areas of background tiles, using two bits for each area.
From left to right, the eight bits in an attribute table byte
hold the palette number for bottom-right, bottom-left, top-right,
and top-left 2x2 areas.

{% figure(img="attribute-table.png") %}
Layout of bits in an attribute table byte.
{% end %}

In this case, we want to change the palette for the bottom-right
section of an attribute table byte, so we will need to change
the leftmost two bits of the byte. By default, the attribute table
is all zeroes, meaning every 2x2 area of the background uses the
first background palette. Let's change our tile to use the second
palette (`01`) instead of the first palette (`00`).
To change just the bottom-right 2x2 area, and leave the other parts
of this 4x4 area with the first palette, we would write the byte
`%01000000` to the appropriate PPU memory address (`$23c2`).
Here is what that would look like:

```ca65, linenos, linenostart=158
  ; finally, attribute table
  LDA PPUSTATUS
  LDA #$23
  STA PPUADDR
  LDA #$c2
  STA PPUADDR
  LDA #%01000000
  STA PPUDATA
```

Remember that this will set _all_ tiles in that 2x2 region to use the
second palette. In this case, the background tiles we are setting are relatively
far apart, but if your backgrounds are more "busy" you will need to think
carefully about where to change from one background palette to another.
When you select a palette (by clicking any color within the palette)
before placing a tile in the nametable display, NES Lightbox will update
the underlying attribute table and update all tiles in the affected
2x2 area to use the new palette, which can help you identify potential
attribute table clashes.

## Additional Changes

As our games start getting more complicated, the simple reset and
NMI handlers we started with will need some minor changes to prevent
strange (and difficult to debug) graphical glitches. In our reset
handler, I've added a loop that sets the Y-position of all sprites
off the screen (i.e. any value larger than `$ef`).
The state of CPU memory can be random at startup, which could result
in portions of the OAM buffer at `$0200` having fake
sprite data. This loop hides all sprites off the screen until
we explicitly set them ourselves, which will prevent these
"phantom" sprites from being visible to the player.

```ca65, linenos, linenostart=17
  LDX #$00
  LDA #$ff
clear_oam:
  STA $0200,X ; set sprite y-positions off the screen
  INX
  INX
  INX
  INX
  BNE clear_oam
```

Second, our NMI handler will need to set the scroll position of the
nametables. We will cover scrolling in detail in a later chapter,
but for now just know that we are setting the scroll position
to display the first nametable, with no scrolling. If we did not
explicitly set this scroll position, we could accidentally display
a combination of nametables at an unpredictable scroll point.

```ca65, linenos, linenostart=9
.proc nmi_handler
  LDA #$00
  STA OAMADDR
  LDA #$02
  STA OAMDMA
  LDA #$00
  STA $2005
  STA $2005
  RTI
.endproc
```

Finally, now that we are using both sprites and backgrounds, we
need to set all eight palettes. To do so, I've expanded the
palette definitions in the `RODATA` segment as follows:

```ca65, linenos, linenostart=192
palettes:
.byte $0f, $12, $23, $27
.byte $0f, $2b, $3c, $39
.byte $0f, $0c, $07, $13
.byte $0f, $19, $09, $29

.byte $0f, $2d, $10, $15
.byte $0f, $19, $09, $29
.byte $0f, $19, $09, $29
.byte $0f, $19, $09, $29
```

The first four palettes are background palettes, and the second set
of four palettes are sprite palettes. Note that I have also changed
the colors used in the first sprite palette to make the "spaceship"
look better.

Since we now need to write more than just four palette bytes, I've
changed the loop that writes palettes to use `CPX #$20`
(16 values) instead of `CPX #$04`.

## Using NES Lightbox Projects

Before we move on to this chapter's homework, let's look at the
"Project" functionality of NES Lightbox. A "project" is a list of
files that make up a working environment (tileset, palettes, nametable)
and the currently-selected tileset bank. The project file uses
full paths to each file, which means that project files are
unfortunately not portable between different computers.

To create a project file, select Project &rarr; Save Project As...
from NES Lightbox's menus. Choose a name for the project file
and click "OK". Any files that you had previously opened will
be saved as part of the project file. Any tileset, palette set,
or nametable that had not previously been saved will be saved
with the name of the project. If your project is named "starfield.nesproj",
a nametable that had not previously been saved would be saved
as "starfield.nam". Once you have saved (or loaded) a project,
you can select Project &rarr; Save All Project Files to save
the project's .chr, .nam, and .pal files with the current data
in the application.

To restore your work environment later, select Project &rarr; Open
Project... and select the .nesproj file you saved earlier.
If any of the project's files have changed location on disk, you
can edit the .nesproj file with any text editor - it is simply
a JSON file that contains the path to each file.

## Homework

To help you get started, download
<a href="https://famicom.party/book/projects/13-backgroundgraphics.zip">all of the code from this chapter</a>.
Here is what our project looks like so far running in an emulator:

{{ nesexample(id="backgrounds-canvas", rom="backgrounds.nes") }}

For homework, add a new tile to the background pattern table
("Bank B" in NES Lightbox), use the new tile in a nametable,
and update the attribute table for the new tile to use
more than one palette. You can use the `.nam`
file provided to get your NES Lightbox environment set up quickly.
Be sure to save your modified `.chr` file and
to re-build all .asm files each time you make changes.

Next time, we'll take a look at sprite animation and the
debugging tools built into Nintaco.
