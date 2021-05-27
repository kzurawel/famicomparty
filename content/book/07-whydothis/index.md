+++
title = "7. Why Would Anyone Do This?"
weight = 70
+++

We've spent six chapters together talking about how to get an over-30-year-old game system
to display a static, green background. (Thank you, by the way, for sticking with me this
long!) This is, to be fair, an incredible amount of work for such an unimpressive result.
At this point, you may be wondering why anyone would bother going through so much work.
Before we move on, I'd like to take the opportunity to remind you of why it's worth
investing the time to develop for the Nintendo Entertainment System.

## It's a Classic

First, the NES is an absolute classic. In both the US and Japan, it dominated the home
video game market for most of the 1980's. In the aftermath of the 1983 "Atari crash",
it single-handedly revitalized the US home video game market. An entire generation of
gamers have fond memories of the system, and even young people with no prior
experience with the system recognize its historical importance.

{{ youtube(id="bDOZbvE01Fk", start=443) }}

{% quote(author=`Ethan James (age 19), "Teens React to Nintendo (NES)"`) %}
I can't imagine a world without home video games. That's like saying TV wouldn't work,
or a movie wouldn't work. &hellip; _It's a classic._ Like a classic vinyl
record. This [NES] is a classic vinyl video game.
{% end %}

## It's Good for Individuals and Small Teams

Most commercial NES games were made by small teams. Consider _Donkey Kong_, the game
that the NES was designed to play:

{% table() %}
| Role                   | Name             |
| ---------------------- | ---------------- |
| Programmer             | Toshihiko Nakago |
| Course Designer        | Kenta Usui       |
| Original Game Designer | Shigeru Miyamoto |
| Music & Sound Effects  | Yukio Taneoka    |
| Producer               | Masayuki Uemura  |
{% end %}

The entire Famicom game was made by a team of five people, only one of
which was a "Programmer". Many of the best games for the NES were made
by similarly small teams, like _Super Mario Bros._:

{% table() %}
| Role                       | Name             |
| -------------------------- | ---------------- |
| Producer/Director/Designer | Shigeru Miyamoto |
| Assitant Director/Designer | Takashi Tezuka   |
| Sound & Music              | Koji Kondo       |
| Programmer                 | Toshihiko Nakago |
| Programmer                 | Kazuaki Morita   |
{% end %}

_Super Mario Bros._ is quite likely the most iconic NES game of
all time, and it, like _Donkey Kong_, was produced by a team
of five people, two of whom were programmers.

## It's Powerful Enough to Be Interesting

Compared to its predecessor in the home video game market, the Atari 2600,
the NES offers a much greater range of expression to the developer.
The Atari 2600 was designed to play a game called _Combat_:

{{ youtube(id="3m86ftny1uY") }}

_Combat_ features no music, only sound effects, and a limited set
of graphics to convey the "playfield" where the action takes place.
The 2600 gave developers access to one background layer, two "sprite"
objects (in this case, the tanks), and two "ball" objects (the bullets
fired by the tanks). Any other graphics had to come from the player's
own imagination.

_Donkey Kong_, the game the NES was designed to play, is a
far different experience:

{{ youtube(id="C_PrG8P5W8o", start=20) }}

There is simple, repetitive music in addition to the sound effects of
Mario walking and jumping over barrels. Multiple moving objects
are on screen at one time (barrels, the flaming oil drum, the animated
Donkey Kong at the top of the screen). Even in their use of text,
the two games differ greatly. _Combat_ displays only a single large
score number for each player at the top; _Donkey Kong_ shows
the player's current score (using six digits), the current high score,
the number of lives the player has remaining, and how many "bonus"
points the player is able to earn by completing the stage.

In total, these changes allow the NES to display much more information
on screen at one time, giving developers the freedom to create far
more detailed and nuanced games than what was possible on the
Atari 2600.

## It's Simple Enough to Be Approachable

While the NES was a major step up from the capabilities of the Atari 2600,
it pales in comparison to its own successor, the Super Famicom / Super NES.
Here is a brief list of differences between the two consoles:

{% table() %}
|                       | NES                                 | SNES                                   |
| --------------------- | ----------------------------------- | -------------------------------------- |
| CPU                   | 8-bit MOS 6502 derivative, 1.79 MHz | 16-bit MOS 65c816 derivative, 3.58 MHz |
| Addressable memory    | 64KB                                | 16MB                                   |
| RAM                   | 2KB                                 | 128KB                                  |
| Graphics resolution   | 256x240                             | up to 512x478                          |
| Available colors      | 64                                  | 32,768                                 |
| Background layers     | 1, up to 512x512                    | 4, each up to 1024x1024                |
| Audio output          | 5 fixed channels                    | 8 fully-programmable channels          |
| Largest released game | 1MB                                 | 6MB                                    |
{% end %}

All of this additional power comes at a cost. The Super NES is much more
difficult to program compared to the more limited NES. Having more space
to store graphical assets means that designers are expected to produce
far more output. The amazing audio processor on the Super NES requires
a composer who is well-versed in its intricacies, since developers
have to provide it with sound samples rather than using a built-in
set of instruments. Super NES development is much less feasible as
a solo developer or small team. Just compare the staff rolls of the
NES games above to the team that created _Super Mario World_,
the game the Super NES was designed to play:

{% table() %}
| Role                     | Name                |
| ------------------------ | ------------------- |
| Producer                 | Shigeru Miyamoto    |
| Director                 | Takashi Tezuka      |
| Sound Composer           | Koji Kondo          |
| Map Director             | Hideki Konno        |
| Area Director            | Katsuya Eguchi      |
| Programming Director     | Toshihiko Nakago    |
| Mario/System Programmer  | Toshio Iwawaki      |
| Object Programmer        | Kazuaki Morita      |
| Background Programmer    | Shigehiro Kasamatsu |
| Background Programmer    | Tatsunori Takakura  |
| Map Programmer           | Tatsuo Nishiyama    |
| Area Data Input          | Yoshihiro Nomoto    |
| Area Data Input          | Eiji Noto           |
| Area Data Input          | Satoru Takahata     |
| Character Graphic Design | Shigefumi Hino      |
{% end %}

## People Still Make NES Games Today

Nintendo ceased production of the NES in 1995, ten years
after it was first released in the US. The last
officially-licensed NES game released in North America
was 1994's _Wario's Woods_. In the years that followed,
as emulation (and therefore understanding) of the NES
increased in quality, many independently-produced
games were released for the system, often created
by solo developers or very small teams. Here are just
a few "homebrew" NES games that show what the system
is capable of.

### _Battle Kid: Fortress of Peril_, Sivak Games, 2010

Produced by a solo developer, _Battle Kid: Fortress of Peril_
helped popularize the idea of homebrew NES development.

{{ youtube(id="yne04hukuyc", start=290) }}

### _Kira Kira Star Night DX_, RIKI, 2013

A Famicom exclusive, _Kira Kira Star Night DX_ is essentially
a great chiptune album with a beautiful (if simple) game
attached. Its initial cartridge print run sold out in
a single day.

{{ youtube(id="h8kj7kytJp4") }}

### _Twin Dragons_, Broke Studio, 2018

_Twin Dragons_ was a Kickstarter project by French developers Broke
Studio. It raised over &euro;30,000, easily meeting its
campaign funding goals.

{{ youtube(id="BOn6hEZuolU", start=288) }}

### _Lizard_, Brad Smith, 2018

_Lizard_ is a new NES game released both on a physical
NES cartridge and digitally over Steam (wrapped in an NES
emulator).

{{ youtube(id="5RDAoN_qO9w", start=58) }}

## It Has a Vibrant Community

Thankfully, the developers who continue to create new NES games
to this day are not isolated hermits. They are part of a broad
community of hobbyists and NES players who continue to expand
our knowledge of how the NES operates and how best to create
games for it. The community has put together enormous amounts
of reference documentation at the [NESDev Wiki](https://wiki.nesdev.com),
and the [NESDev Forums](http://forums.nesdev.com/) are
a great place to get help or to see some of the latest
techniques homebrew developers are using.

## ...Continue?

If, over the last few chapters, you were a bit frightened about
what you were getting into, I hope that this chapter has re-invigorated
you. The NES is a strong platform for development that sees
new releases and new insight frequently, and I can't wait to
continue introducing you to how it works. Let's keep going!
