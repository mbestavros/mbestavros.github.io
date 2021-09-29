---
layout: layouts/post
title: Sigstore, in a nutshell
subtitle: Join me on a journey through the depths of supply chain security.
date: 2021-09-29
header-image: https://unsplash.com/photos/XQaqV5qYcXg/download?force=true
tags:
    - tech
    - professional
    - security
    - thoughts
---
# I did it! I submitted my [pull request](https://github.com/sigstore/fulcio/pull/187)!

What, no applause?

Well, I guess a pull request on its own is nothing out of the ordinary. But _this one_ is special - at least to me. It’s the culmination of a couple months of my work on the Sigstore project, and while the road to opening it was bumpier than Memorial Drive before it was re-paved this summer, I’ve learned a lot along the way.

Gather round, grab a drink, and let’s talk about it!

## Hold up… what the heck is Sigstore?

Aside from my professional life for most of 2021? Well, in the project’s [own words](https://www.sigstore.dev/):

> sigstore is a set of tools developers, software maintainers, package managers and security experts can benefit from. Bringing together free-to-use open source technologies like Fulcio, Cosign and Rekor, it handles digital signing, verification and checks for provenance needed to make it safer to distribute and use open source software.

If that doesn’t mean anything to you, that’s fine! Let’s unpack it by first talking about the problem Sigstore is trying to solve.

## Supply Chain Security, or: making sure your dependencies are authentic

_(Note: I fell into my usual trap of over-explaining something that my intended audience probably already understands. If “developers need to make sure their dependencies are from where they say they’re from or bad things will happen” tells you everything, feel free to skip some or all of this section - if not, please read on!)_

### What’s a dependency?

It’s exceedingly rare for a modern piece of software to have a monolithic codebase (or, in other words, for all its code to have come from a single source); indeed, in a lot of cases, it’s very likely a lot of the code that gets shipped to end-users is, in some form or another, part of a **dependency**, or a piece of code that is maintained separately by a third party. In a lot of cases, these dependencies accomplish some common task that many different pieces of software need to function. A good example might be a video player - it would be wildly impractical for a developer to write one from scratch, so chances are they’ll look for someone else that’s done it already and include their work as part of their project (assuming they’re allowed to by whatever license the video player is published under).

Dependencies are very useful! They allow developers to spend time focusing on novel, interesting parts of their software instead of having to deal with more foundational bits that have already been done hundreds of times before by others. Plus, if a dependency has a bug, it only has to be fixed once - and when projects update that dependency, the bug will be fixed for them too.

### The dark side of dependencies

Dependencies can also be problematic. Because they tend to be maintained by third parties, the developer using them must have some degree of trust that those third parties will not do malicious things with the access they’re given (something I’ve talked about in much greater length [here](https://mark.bestavros.net/blog/a-matter-of-trust-1/)). This may be a safe assumption to make most of the time, but what happens when it _isn’t_? What happens if a malicious dependency makes its way into a developer’s codebase?

Bad things. _Really_ bad things.

In fact, that is exactly what a **supply chain attack** means: some adversary manages to sneak a malicious piece of code into an otherwise trusted piece of software and, in the process, gain unauthorized access to places that use that software.

This is an increasingly pervasive attack vector: [research](https://venturebeat.com/2021/09/15/next-gen-software-supply-chain-attacks-up-650-in-2021/) suggests that there’s been a staggering _650%_ increase in this kind of hack in 2021 alone. And the targets are big: remember the [SolarWinds](https://www.npr.org/2021/04/16/985439655/a-worst-nightmare-cyberattack-the-untold-story-of-the-solarwinds-hack) hack, the one that managed to breach a significant portion of the US government’s IT infrastructure? That was a supply chain attack - probably the most devastating example to date.

In short, supply chain attacks are a _very_ real problem, and the stakes for preventing them are high.

## The solution: software signing

The good news? It’s a solved problem. [**Code signing**](https://en.wikipedia.org/wiki/Code_signing), in short, is the act of using cryptographic mechanisms like signatures and certificates to verify that a piece of software was authored by a particular party, and that it hasn’t changed since the author verified their ownership of it. This is a powerful tool - one that, if (theoretically) enforced for all dependencies in the software supply chain, would effectively deny any opportunity for a supply chain attack to happen in the first place. Which is great!

### So... why isn’t it used everywhere?

In short: because it’s _hard_. Code signing is built on the same tools used for signatures and certificates on the Internet, which has very different (and, often, heavier) requirements of those tools. As a result, code signing is typically only done by rather large projects - and when it _is_ done, it’s often inconsistently implemented, and hard to check automatically. In practice, this means code signing has largely been a formality to date, and not an effective deterrent to supply chain attacks.

## The solution, part 2: Sigstore

And now, we finally get to **Sigstore**: a set of (free and open source) tools meant to make both signing and verifying code as painless and automatic as possible - in particular, a set of three core tools: **Rekor**, **Cosign**, and **Fulcio**. Here’s a brief summary of what each one does:

- [**Rekor**](https://github.com/sigstore/rekor) is a tamper-resistant ledger/storage service for metadata produced throughout the software supply chain, including signatures and timestamps. Developers can write that metadata to Rekor as part of their build process, and users can check the metadata of the software they’re running against Rekor in a standardized way to make sure everything checks out.

- [**Cosign**](https://github.com/sigstore/cosign) is a tool designed to make signing artifacts like containers and binary blobs as easy as possible. It integrates with Rekor such that when you use it to sign something, the signature is automatically uploaded to Rekor’s transparency log.

- [**Fulcio**](https://github.com/sigstore/fulcio) is a tool for creating short-lived certificates specifically for use in code signing, without the need to persist certificates longer term. It integrates with OIDC identity providers like Google, Github, and Microsoft to make establishing identity relatively painless compared to the status quo. (This is the project I submitted my pull request to!)

When used together, these tools are a powerful mix - the foundations for a more secure software supply chain.

Of course, supply chains are only as good as their weakest link, which is why it’s important to get these tools into the hands of as many developers as possible. To that end, another part of the Sigstore project’s mission is to build integrations and interoperability with commonly-used software tools - like the Python toolchain, for example: when a developer publishes a package on PyPI, they might enforce checks against the Rekor transparency log.

Finally, everyone involved in the Sigstore project recognizes that this kind of effort is a rising tide that lifts all boats: the ecosystem is better off when more people have good supply chain security. As such, the project’s sponsors see Sigstore as a **public good service** in the vein of [LetsEncrypt](https://letsencrypt.org/). While companies can build stuff on top of the core technology, there will always be a publicly-available and free instance for everyone to use.

## Wrapping up

I… didn’t intend to write an intro to Sigstore that was this long. But I guess I did. Hooray?

Anyway, this is what I’ve been working on for most of 2021. Isn’t it neat? I think it’s pretty neat. I did accidentally write an entire blog post about it, after all.

I’ll be publishing a follow-up essay about my work on Fulcio specifically. Stay tuned, and thanks for reading!
