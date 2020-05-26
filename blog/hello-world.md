--- 
layout: layouts/post
title: Hello, world!
subtitle: A quick look into how I built this site.
header-image: https://images.unsplash.com/photo-1451187580459-43490279c0fa
--- 
# I (finally) have a blog!

It's been a long time coming.

A personal website almost seems a rite of passage for computer science types; all my classmates and colleagues seem to have them. And yet, somehow, I'd never gotten around to building one for myself.

That doesn't mean I hadn't been thinking about it. For over a year now, I've stopped and started researching and experimenting with various web dev tools in my spare time, and eventually began to flesh out the foundation of this personal portfolio site.

I kept making small progress right up until COVID-19 hit. I figured I'd make the best of all the time I'd gotten back from not commuting to just push this across the finish line. And here we are!

Let's talk a bit about it.

## The Core Principle: Performance

I am a bit of a software speed freak, as I'm sure I'll write about separately in the future. Keeping my site **as fast as possible on as many devices as possible** was my central guiding principle.

My site doesn't need to do a whole lot to begin with. In particular, images are the only thing that might realistically have a significant bandwidth impact, so I've spent a fair bit of time making sure every image on the site is either:

- a vector (SVG) graphic
- available in a variety of sizes and efficient, modern formats (like Google's WebP)

Of course, I can't claim to be an authority on making the web fast, and there is absolutely more I can do. But I think I'm content with it as-is for now. Though I only have a small set of hardware with me to test on (plus Chrome Dev Tools), Google's [web.dev](https://web.dev/measure/) measuring tool seems to like it:

<div class="card-local-media">
{% responsiveImage, "content/personal/web-dev-speed-test.png", "" %}
</div>

That's a good (and very satisfying) sign.

## Design

From the very beginning, I knew I wanted to utilize Google's [Material](https://material.io/) design language. I've been a huge fan of it ever since it came out way back in 2014.

Of course, converting that desire into code proved challenging at first. Initially, there were no official libraries available -- only a smattering of third-party offerings, none of which really covered every possible need. Fortunately, the official offering came in the form of Google's [Material Components for the Web](https://material.io/develop/web/), which I now use exclusively. It's got its quirks, but I'm pretty happy with the results I've gotten out of it.

## Backend (rather, a lack of it)

Under the hood, this site is being hosted statically on Github Pages; I don't maintain a backend, and I shouldn't have to for something as simple as this.

I _do_ use a static site generator -- specifically, [Eleventy](https://www.11ty.dev/) -- to make the magic happen. (I briefly played with Jekyll, Github Pages' built-in option, but it didn't quite meet my needs.)

Most of all, Eleventy stood out to me for its simplicity while still offering access to the robust Node.JS ecosystem (a requirement for MDC Web). Where other Node offerings seemed monolithic and intimidating, Eleventy was quick to set up and use, and I kind of just ran with it. I'm still pretty darn pleased.

## Show me the code!

It's all on my [Github!](https://github.com/mbestavros/mbestavros.github.io)

## Okay, so... what about the blog itself?

I've got some ideas lined up. I think an awful lot about technology and how we use it, and I've lacked an outlet to express those thoughts. If nothing else, I suspect my blog will become a dumping ground for them. Expect ramblings on everything from internet privacy to dark mode.

Apart from that, I'm a gadget nerd, and I've always wanted to write reviews of my own devices. Obviously, I'll only be able to cover the devices I actually own, so I'll probably focus on why it was the right choice for _me_ and my specific use case. Perhaps that will be interesting to some like-minded folk.

It's also quite likely I'll have a few posts about what I'm working on professionally at the moment, if I think it's particularly interesting and worth sharing in long-form. Likewise for personal life updates.

That's all I have for now. Thanks for reading, and stay tuned! I'll probably propagate new articles via my [Twitter](https://twitter.com/MBestavros) feed, so that's probably the best place to follow me.
{% articleSetHeaders, title, subtitle, header-image %}
{% pageMetadata, title, subtitle %}
