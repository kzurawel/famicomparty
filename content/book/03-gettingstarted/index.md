+++
title = "3. Getting Started"
weight = 30
+++

Let's get started actually programming for the NES! In this chapter, we're going to
set up a development environment, installing all of the tools that you will need
to work through this book, and then we will build and run the most basic game
possible just to make sure everything is working.

## Setting Up Your Development Environment

Here are all of the tools that we will be installing. Some of these will be used
right away (and all the time), while others are more specialized and won't come
into play until much later. For each category, I'm including the specific
software I will be using in this book; there are many other choices, so feel
free to experiment with other tools once you get comfortable with my recommendations.

- A text editor (your choice)
- An assembler/linker (ca65 and ld65)
- An emulator (Nintaco)
- A graphics tool that can read/save NES formatted images (NES Lightbox)
- A music composition tool (FamiStudio)

## Text Editor

First, you will need a _text editor_. I assume that you have previous
programming experience and that, as a result, you already have a favorite text
editor. If not, here are a few programs that you may want to try.

- [Sublime Text](https://www.sublimetext.com/). Cross-platform, popular
  with web developers, easy to get started with and powerful tools once you
  get familiar with the basics.
- [Atom](https://atom.io/). Basically GitHub's answer to Sublime Text.
  Cross-platform, highly configurable.
- [Visual Studio Code](https://code.visualstudio.com/). Microsoft's robust
  text editor platform. Tailored for web development but extensible for any kind
  of programming. Also cross-platform, not limited to Windows.
- Vim, emacs, nano, etc. Command-line text editors of yore. (I personally use Vim, but
  your mileage may vary.)

## Assembler and Linker

An _assembler_ compiles your assembly code (what we will be writing in this book)
into machine code, the raw stream of bytes that the processor reads. A _linker_
takes a group of files that have been run through the assembler and turns them into a
single program file. Since each processor has its own machine code, assemblers usually
target only one type of processor. There are many assemblers and linkers to choose from
for the 6502, but for this book we will be using ca65 and ld65. They are open-source and
cross-platform, and have some very useful features for developing larger programs. ca65 and
ld65 are part of the larger "cc65" suite of programs, which include a C compiler and more.

### Mac

To install ca65 and ld65 on a Mac, first install [Homebrew](https://brew.sh), a
Mac package manager. Copy and paste the command from the homepage into a terminal and press
enter; follow the instructions and Homebrew will be ready to use. Once you have Homebrew,
type `brew install cc65` and press enter.

### Windows

On Windows, you'll need to download ca65 and ld65 to a specific directory on your computer.
Download the latest "Windows Snapshot" from the [main cc65 project page](https://github.com/cc65/cc65).
Unzip the contents to `C:\cc65`. You'll also need to update
your system path to make ca65 and ld65 available from any directory. The process for doing
this varies depending on which version of Windows you are using. On most newer versions of
Windows, you can right-click "My Computer", select "Properties", then "Advanced System Settings"
and finally "Environment Variables". You'll want to find the entry for `%PATH%` and
add `C:\cc65\bin` to the end of it.

### Linux

You will need to build cc65 from source. Thankfully, this is a fairly simple process. First,
make sure you have git and a basic build environment - on Ubuntu, for example, `sudo apt-get
install git build-essential` should do it. Then, navigate to the directory where you want
to install cc65, clone the cc65 repository, and build it:

```
git clone https://github.com/cc65/cc65.git
cd cc65
make
```

Finally, make the cc65 programs available from any directory with `sudo make avail`. This will
add symlinks from your cc65 folder to `/usr/local/bin`.

## Emulator

An _emulator_ is a program that runs programs intended for a different computer system.
We will use an NES emulator to run the programs that we create on the same computer used to
develop them, instead of requiring a hardware NES. There are a number of NES emulators available
(and, once you have a solid grasp of NES development, it's fun to try to make your own!), but
for this book we will be using [Nintaco](http://nintaco.com/).{% sidenote(id="nintaco",
img=["nintaco.png", ""]) %}
Nintaco.
{% end %} It is cross-platform and one of the few emulators to feature debugging tools, which will be
useful as we write programs.

Installing Nintaco is the same for all platforms - download it from the Nintaco website and unzip.
To run Nintaco, double-click Nintaco.jar. Nintaco requires Java to run; if you do not have Java
installed on your computer, download a "Java Runtime Environment" from [java.com](https://java.com).

## Graphics Tools

The NES stores graphics in a very different format from common image types like JPEG or PNG. We
will need a program that can work with NES images. There are plugins for large graphics
packages like Photoshop or GIMP, but I like using a smaller, purpose-built tool for this.
For this book, we will be using [NES Lightbox](https://famicom.party/neslightbox),{%
sidenote(id="nes-lightbox", img=["neslightbox.png", ""]) %}
NES Lightbox.
{% end %} a cross-platform derivative of [NES Screen Tool](https://shiru.untergrund.net/software.shtml).

### Windows

Download the [Windows installer](https://famicom.party/neslightbox/releases/1.0.0/NES%20Lightbox%20Setup%201.0.0.exe)
(for 64-bit systems). Double-click "NES Lightbox Setup 1.0.0.exe" to install it.

### Mac

Download the [Mac DMG](https://famicom.party/neslightbox/releases/1.0.0/NES%20Lightbox-1.0.0.dmg).
Double-click the .dmg file to open it and drag the NES Lightbox app to your Applications folder. You will
need to right-click the application and choose "Open" the first time you try to
run the program, since it is not "notarized" by Apple.

### Linux

On Ubuntu systems, you can download the [Snap file](https://famicom.party/neslightbox/releases/1.0.0/neslightbox_1.0.0_amd64.snap),
which is a self-contained application package. For other Linux distributions (or if you prefer AppImage), download the
[AppImage file](https://famicom.party/neslightbox/releases/1.0.0/NES%20Lightbox-1.0.0.AppImage). You will
need to mark the AppImage file as executable before running it.

## Music Composition Tools

As with graphics, NES audio is a set of instructions to an audio processor rather than something
like an MP3. The most popular program for creating NES audio is [FamiTracker](http://www.famitracker.com/),
which is powerful but complex and Windows-only. For this book, we will be using
[FamiStudio](https://famistudio.org), which is cross-platform, has a friendlier
interface, and outputs directly into an easy-to-integrate format.{% sidenote(id="famistudio",
img=["famistudio.png", ""]) %}
FamiStudio.
{% end %}

### Windows / Mac / Linux

Download the latest release from the [FamiStudio website](https://famistudio.org).

## Putting It All Together

Now that you have all of the tools installed, it's time to make sure that they work. We are going to
create the "Hello World" of NES games: filling the entire screen with one color.

Open your text editor and create a new file, `helloworld.asm`. Copy and paste the following
code into the file:

```ca65, linenos
.segment "HEADER"
.byte $4e, $45, $53, $1a, $02, $01, $00, $00

.segment "CODE"
.proc irq_handler
  RTI
.endproc

.proc nmi_handler
  RTI
.endproc

.proc reset_handler
  SEI
  CLD
  LDX #$00
  STX $2000
  STX $2001
vblankwait:
  BIT $2002
  BPL vblankwait
  JMP main
.endproc

.proc main
  LDX $2002
  LDX #$3f
  STX $2006
  LDX #$00
  STX $2006
  LDA #$29
  STA $2007
  LDA #%00011110
  STA $2001
forever:
  JMP forever
.endproc

.segment "VECTORS"
.addr nmi_handler, reset_handler, irq_handler

.segment "CHARS"
.res 8192
.segment "STARTUP"
```

Next, we need to use our assembler. In the directory where you saved helloworld.asm,
run `ca65 helloworld.asm`. The result should be a new file, helloworld.o.
This is an _object file_ - machine code. But it is not in a format that is
ready to plug into an emulator just yet. To do that, we need to run the linker.
In the same directory, run `ld65 helloworld.o -t nes -o helloworld.nes`.
This should result in a new file, helloworld.nes - a "ROM" file for the emulator.

Open Nintaco and choose "Open" from the "File" menu. Select the helloworld.nes file
you just created and click Open. The result should be a green screen.{% sidenote(id="explain-nes-examples") %}
The green screen here is an actual, running NES emulator in your browser! I am using
the amazing [jsnes](https://github.com/bfirsh/jsnes) by [Ben Firshman](https://fir.sh/).
Whenever we compile a .nes file, I will include a running demo like this one. (It's hard
to tell in this case, but the emulator is actually running at 60fps.)
{% end %}

{{ nesexample(id="helloworld-nes", rom="helloworld.nes") }}

## Next Steps

If you were able to see the green screen in Nintaco, congratulations! Your development
environment is ready to use. In the next chapter, we will discuss what the code you
copied and pasted is actually doing, and learn a bit about how the NES hardware works.

