---
layout: layouts/post
title: "Kubecon LA 2021: a novice's diary"
subtitle: Attend the world's premier Kubernetes conference without the cross-country flights!
date: 2021-10-29
header-image: content/personal/kubecon-sigstore-booth-portrait.jpg
tags:
    - tech
    - professional
    - security
    - thoughts
    - travel
    - photography
---

# I’ve just returned from a trip to sunny, sprawling Los Angeles!

Before you get too excited: it’s not because I’ve been cast as a stereotypically nerdy hacker sidekick in a movie (though that’s probably for the best).

No: it’s because I was attending **Kubecon 2021**! From October 13-15, this enormous Kubernetes-focused developer conference took over the LA Convention Center, turning it into a mecca of buzzwords, business pitches, and networking. And I was there! It was actually my _very first_ big developer conference and the first time I’ve done business travel… ever. As the starry-eyed newbie, I was enthralled: stopping by random booths, chatting with people, and - thanks to COVID - meeting many colleagues I’d only ever seen over video before. (And being shocked by how tall they were, in a few cases.)

Of course, I had a few practical reasons to be there, too: Sigstore, the project I’ve been working on for a while (and that I've written an explainer for [here](https://mark.bestavros.net/blog/sigstore-in-a-nutshell/)), had a booth in the expo hall! Red Hat, my employer and the company that funded the booth, was looking for volunteers to help out - and I jumped at the opportunity. But that wasn’t all: in addition to the main event, Kubecon played host to a number of co-located conferences in the days leading up to the event. Of particular interest to me (and the other Red Hatters working on Sigstore) was the **Supply Chain Security Conference** on Monday, which I attended along with a host of other Sigstore developers from Red Hat and elsewhere. It was a great experience with lots of fascinating talks, and I’m glad I had the chance to be there in person.

Since this was my first big business trip (and since some friends and colleagues have expressed interest in hearing about it), I figured I’d write up my experience! Hop in, reader, you’re in for quite a week.

_(Note that this blog post will focus strictly on the “professional” side of the trip: the conference itself, the talks I attended, and my experience helping out with the Sigstore booth. I’ve also written a companion piece where I talk about my “after hours” experience as a tourist in LA - you can read that [here](https://mark.bestavros.net/blog/kubecon-2021-after-hours/).)_

## Sunday: the trip to LA

Note to self: don’t book an early morning flight for a conference that begins the day after. You’re going to have a lot of time you won’t know what to do with once you arrive. And you’ll be tired.

## Monday: SupplyChainSecurityCon

Okay, I’m still tired at this point. But also full of energy! It’s conference time!

<div class="card-local-media-half">
{% responsiveImage, "content/personal/kubecon-entrance-hall.jpg", "" %}
</div>

SupplyChainSecurityCon started itself right with... [Operation SLSA](https://www.youtube.com/watch?v=S_MXbt0p_pg). Do yourself a favor and set aside five minutes to watch that video - you _won’t_ regret it. Done? Good. I’m sure you’re feeling at least ten times cooler now.

The rest of the morning was filled with more... traditional keynotes, including from Red Hat’s own Luke Hinds (delivered virtually, as he sadly couldn’t make it in person due to travel restrictions from the UK). The extended keynote was certainly the highlight, however, delivered by Trevor Rosen of none other than SolarWinds. Yes, [that SolarWinds](https://en.wikipedia.org/wiki/2020_United_States_federal_government_data_breach)! It was a really cool look behind the curtains of what happened to them: how their engineers realized something had gone wrong, how they mitigated it, and how they dealt with the fallout. Most importantly, however, he talked in detail about what SolarWinds is calling Project Trebuchet: their effort to use community standards like Sigstore and others along with homegrown code to improve their supply chain security - something their company leadership had promised under oath to Congress, no less. It was an excellent talk, and I recommend giving it a watch - link [here](https://www.youtube.com/watch?v=1-tMRxqMwTQ&list=WL&index=49).

After the keynotes, the rest of the day was a mixture of talks and panels with various people: developers working on Sigstore and similar projects (SLSA, Tekton, TUF, etc), developers from parts of the supply chain that can integrate that tooling (Jenkins, PyPI), as well as representatives from companies that have a stake in secure supply chains (Ericsson, CitiBank). All the talks were excellent and worth a watch if you’re interested in them (the full playlist of talks from the day is [here](https://www.youtube.com/watch?v=WIo6EhVCzW4&list=PLj6h78yzYM2NOCoaYcYbiAf4KPIF36T8t)), but I thought a particular highlight was the State of SBOMs panel hosted by Dan Lorenc and which featured Dr. Allan Friedman, who works for the US government and talked about how they’re working with existing developer communities to make things work with the recent executive order on supply chain security, particularly around standardization - think SLSA. [Here's](https://www.youtube.com/watch?v=yfRkIQsmJ04) the link.

Stepping back, I noticed a few distinct high-level trends from the day:

- Through a number of the talks, there was a lot of emphasis on _end to end_ supply chain security, and how different projects can be put together to achieve meaningful improvements to security. For a good example, watch the “State of the Art Supply Chain Security” talk [here](https://www.youtube.com/watch?v=PJ6b2eoq0NY).

- There was a lot of discussion about _policy_: with tools like Sigstore reaching early release states, the question of the hour is not _whether_ we can improve security, but _how_. The tools exist; how do we use them effectively? The aforementioned SBOM panel had a good discussion on this.

- A number of community projects (like Sigstore!) were mentioned _all the time_. This is a pretty strong indicator that the community is centering around them as standards, which is great to see. Plus, it’s cool to see a project you work on have that much buzz.

And the day ended around 5pm! I was _exhausted_, but still really glad I went. There’s talk of another SupplyChainSecurityCon at Kubecon in Valencia already...

## Tuesday: a bit of a lull

I wasn’t signed up for any of the co-located events on Tuesday, so I mostly took the day off to explore LA and prepare for booth duty the following day with Jyotsna Penumaka, my colleague at Red Hat and fellow Sigstore developer.

<div class="card-local-media-half">
{% responsiveImage, "content/personal/kubecon-rooftop-work.jpg", "" %}
</div>

Gotta say, the LA cityscape is a pretty great backdrop to hack away under.

## Wednesday-Friday: Kubecon!

The main event! I’m sure there’s a lot of things people are curious about, so I’ve divided the big points of interest into sections. Let’s dive right in!

### Sigstore at Kubecon

As you might expect if you’re at all familiar with the project and the amount of attention it’s getting, the Sigstore project was very well represented at Kubecon. In addition to the Sigstore booth on the show floor, there were several talks from developers involved with the project throughout the three-day period.

My favorite of those talks by far had to be the Wednesday keynote delivered by Dan Lorenc, CEO of Chainguard, and Red Hat’s own Bob Callaway - both Sigstore co-founders, along with Luke Hinds. Dan gave a great intro to Sigstore and why it’s important, but the highlight was easily Bob’s demo - not of Sigstore, but of what you’d need to do to sign a piece of software _without_ using Sigstore, instead relying on existing tools like `pgp`, `openssl`, and `curl`. Spoiler alert: it’s a lot, and it’s very tedious. Bob, of course, guided us through with charm, and I don’t think anyone left the talk unconvinced that _software signing could be a lot easier_. [Here's](https://youtu.be/PVhRQFS9Njg?t=1523) a timestamped link to Bob's demo, but the full 40-minute talk is definitely worth a watch if you're interested.

<div class="card-local-media-half">
{% responsiveImage, "content/personal/kubecon-sigstore-keynote.jpg", "" %}
</div>

Of course, after the keynote, there was a Sigstore booth to visit - and I helped staff it! My booth shifts were intermittent throughout the conference, but I ended up spending quite a bit of my time there off-shift as well. With practice, my booth colleagues and I were able to get our pitch for Sigstore down to a T, and we had a pretty slick demo to go along with it. Booth attendance was excellent, with lots of people stopping by particularly on Thursday and Friday (likely helped along by the free Google Titan USB-C security keys we were giving away). While some had already heard of Sigstore or one of its subprojects, it’s likely just as many had never considered supply chain security before.

<div class="card-local-media-half">
{% responsiveImage, "content/personal/kubecon-sigstore-booth-crowd.jpg", "" %}
</div>

I was struck by the genuine interest in the project from booth visitors. We had lots of great questions, fascinating follow-up conversations, and connections made through the week; many people thought out loud about how Sigstore might fit or augment their specific subdomain, and reception of the project overall seemed positive. The demo we had prepared at the booth dovetailed well with the keynote talk by Bob and Dan, showing the (much) simpler side of software signing using Sigstore’s tools.

### COVID Safety

I’m sure readers are naturally curious how one of the first truly large tech conferences after COVID handled itself. In short: pretty darn well, by my estimation.

In order to even get into the expo hall, you needed to pass the health checkpoint. In addition to showing proof of vaccination in some form (the Linux Foundation used the fairly straightforward CLEAR app as their main solution for this, though you could elect to simply bring your vaccine card as an alternative), you needed to complete a daily symptom attestation (also done through CLEAR) and temperature check before being let in. Once you’d passed the checkpoint, you got a sticker indicating you’d passed the checks for that day, which allowed you to exit and re-enter the venue without repeating the checkpoint process.

Inside the event space itself, masks were required at all times, except when eating and drinking. Adherence to this rule seemed reassuringly universal. The event was attended by several thousand people, though I’m told it got far higher pre-pandemic. Even with the large volume of people, the sheer size of the LA Convention Center meant that it never felt truly _crowded_, though there were certainly a lot of people around. It was nothing nearly like some pictures I’ve seen of pre-pandemic Kubecons from others that have attended.

<div class="card-local-media-half">
{% responsiveImage, "content/personal/kubecon-venue-crowd.jpg", "" %}
</div>

### Food

Kubecon’s lunch food was a bit of a mixed bag. Sometimes it was perfectly serviceable, other times... less so. There’s definitely some room for improvement there.

One thing they did very right, though: In-n-Out food trucks for dinner during the Wednesday night booth crawl. More of that, please and thank you! 🙂

<div class="card-local-media-half">
{% responsiveImage, "content/personal/kubecon-innout-dinner.jpg", "" %}
</div>

## Saturday: flying home

My Saturday was a long one: my flight left LA at 8:30 AM and arrived in DC at 3:30. The layover allowed me to eat a late lunch before grabbing my connecting flight back home to Boston. I was home by 8:30 PM, and very tired to boot.

I felt good, though: I’d finished my first Kubecon!

If you’ve made it this far, thank you so much for reading my disjointed thoughts and ramblings. I really enjoyed myself, and hopefully I’ll be back sooner rather than later! If you'd like to read more about my experience in LA beyond the conference, check out my companion piece - [Kubecon After Hours](https://mark.bestavros.net/blog/kubecon-2021-after-hours/)!

<div class="card-local-media-half">
{% responsiveImage, "content/personal/kubecon-sigstore-keys.jpg", "" %}
</div>
