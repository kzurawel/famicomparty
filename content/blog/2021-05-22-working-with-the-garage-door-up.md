+++
title = "Working with the garage door up"
+++

A month or so ago I read a blog post about
[working with the garage door up](https://notes.andymatuschak.org/Work_with_the_garage_door_up) - that
sharing your journey toward a finished product is every bit as powerful and
useful as sharing the end products themselves. It has been a long, long time
since I've done anything like that, especially on this site, so I figure now
would be a great time to talk about what I've been up to for the last... three? four? years.

<!-- more -->

First off, this site itself. I've been interested in learning [Rust](https://www.rust-lang.org)
for the last year, and in the process of learning Rust I came across [Zola](https://getzola.org).
For all the years this site has existed, it has been hand-written HTML by me. No static site
generators, no CMSes, just copying and pasting HTML templates and manually updating links.
I knew about SSGs, of course, but I never found one that made writing posts or book chapters
_easier_. Zola, however, has had pretty much everything I am looking for: great Markdown
support, built-in syntax highlighting, and WordPress-style "shortcodes" that let you
move your commonly-used HTML patterns out into functions that can be called in your
Markdown. It's not perfect, of course; I'm still trying to replicate the line-numbering
syntax highlighting of [PrismJS](https://prismjs.com). But it's just so very _nice_
that I've moved all of my websites (famicom.party, the Book, and this blog) over to it.

A large part of my interest in Rust came from my work on
[NES Lightbox](https://famicom.party/neslightbox). I wrote that app in Electron,
and it works well but is quite bloated for what it does (several _hundred_ megabytes!).
I spent a lot of time investigating alternative GUI frameworks, including Qt
(C++), PyQt (Python), gtkrs (Rust), Relm (Rust), and Druid (Rust), but none of
them really seemed to stick for me. Then I started working with
[Tauri](https://tauri.studio) and fell in love with it. Tauri is basically
"Electron, but in Rust, and using the OS' built-in browser framework." The
actual app logic is still in HTML/CSS/JavaScript, but the backend that runs
your web app and connects with the operating system (to show menus, open
files, etc.) is Rust. There's a nice JavaScript API that lets you call in to
the Rust backend without having to write much Rust yourself. The whole thing is a joy to use.

For the app layer itself, I've been looking to write something more expansive
than NES Lightbox. My Tauri app is an attempt at a full workbench of NES graphics
tools, with the ability to create, save, and mix-and-match things like palettes,
sets of tiles, and more. I'm building out this app with [Svelte](https://svelte.dev),
a front-end framework I had been meaning to try out. I've written a fair bit of React
code, and I tried (and disliked) Vue.{% sidenote(id="vue") %}
I'm sure that Vue has improved since I last used it - it always seemed like it was trying
to keep up to date with whatever was new in React - but I really just wanted to try
something different. Maybe I'll pick up Vue again someday and give it another try.
There is a Vue plugin for Tauri which I'm sure makes that integration easier.
{% end %} Svelte seems like the best of both worlds, with a very Vue-like single
file component setup, but a React Hooks-style approach to things like "stores"
(a kind of flux pattern). Setup was super-easy, and it's helped me make good
(or at least what seem like good) architecture choices.

What about the Book? After converting all the content to Markdown (and cleaning up
a few things along the way), I'm starting to work on a new chapter on sprite movement.
That will require a discussion of zero-page RAM in the NES, as well as another
look at NMI handlers and how they work. I can't say when it will be ready (and my
predictions in the past have been terrible), but I am working on it.

Thanks for reading! I'll be posting regular updates like this one in the weeks to
come. You can now subscribe to an [RSS feed](/atom.xml) of updates from across all
Famicom Party sites, if that's something you're interested in.
