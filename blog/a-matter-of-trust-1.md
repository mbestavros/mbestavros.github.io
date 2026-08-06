---
layout: layouts/post
title: A Matter of Trust, part 1
subtitle: A professional retrospective and stream of consciousness all in one!
date: 2021-03-22
header-image: https://images.unsplash.com/photo-1544551763-46a013bb70d5
tags:
    - tech
    - professional
    - security
    - privacy
    - thoughts
---
# What's a blog without writing?

Well... my blog, I suppose. At least until now. Let’s change that, shall we?

During my past two years at Red Hat, I've had the great fortune to be able to contribute to [Enarx](https://enarx.dev/), a really cool project that aims to democratize the bleeding edge of hardware-backed security and make it usable for the masses. As part of my work for this effort, I’ve been able to listen in on (and occasionally contribute to) my colleagues’ fascinating conversations about the idea of **trust** in computing. I think these ideas are actually quite a useful lens through which I can explain my perspective on **internet privacy**, something I’m incredibly passionate about and is a significant driver of my decisions around which pieces of technology to use.

I can’t think of a better way to start off my blog than attempting to distill those thoughts into something (hopefully) readable by normal people (not just technophiles like me). I welcome feedback!

## Enarx and the idea of “trust relationships”

Let’s start with the aforementioned Enarx project -- more specifically, with the problem it’s trying to solve. (Technically minded readers: I will likely butcher some concepts for the sake of explanation -- apologies in advance!)

Enarx is broadly focused on securing cloud and [Edge](https://www.theverge.com/circuitbreaker/2018/5/7/17327584/edge-computing-cloud-google-microsoft-apple-amazon) workloads that deal with extremely sensitive data. A simple example might be a database of patient health records. That data is subject to strict regulations about how it may be handled under [HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act), which, among other things, prohibits data from being disclosed to third parties without explicit patient consent. Similar protections (or concerns) exist with data in many industries: government/public sector, finance, telecommunications, enterprise, etc. In a nutshell, keeping data out of the wrong hands is an extremely high priority for actors in these areas -- much more so than in other industries.

So, how is a well-intentioned engineer (let’s call her [Alice](https://en.wikipedia.org/wiki/Alice_and_Bob), a cryptographer’s greatest friend) supposed to write software that adequately protects data to these rigorous standards? It’s not easy: computers are complex mechanisms, with a mixture of hardware and software components from potentially dozens of different origins in one system -- and even more if Alice’s software is running across many separate systems, or in a VM/container, as is often the case in the cloud. Software engineers call this collective set of components a “stack” -- here’s a diagram that includes a number of components you might find in a typical setup:

<div class="card-local-media-half">
{% responsiveImage, "content/personal/enarx-stackdiagram-clean.svg", "" %}
</div>

Many of these components exhibit one or both of the following properties:

- Requiring **privileged access** to function correctly -- meaning that if the component wanted to, it could tamper with Alice’s application in nefarious ways (accessing sensitive data, for example).
- Being a **black box**: the component performs its function as advertised, but with no transparency as to _how_ it gets accomplished.

The combination of these means that, in many cases, Alice can’t independently verify that her stack’s components aren’t acting maliciously and doing bad things -- for example, sending a copy of her data to a corporate/foreign adversary. She only has the word of the components’ manufacturer/developer that they aren’t.

In effect, Alice needs to **trust** that each of her components aren’t doing bad things. By doing so, Alice is making the decision to form a **trust relationship** with the component’s creator: where one party trusts another to not misbehave. The _amount_ of trust involved is up to the nature of the component: at best, there might be factors that convince Alice that trusting a component isn’t a huge risk. At worst, Alice may have to blindly trust that a component isn’t doing bad things, with little positive proof. Whether Alice is comfortable with the amount she has to trust an individual component is ultimately up to her.

To have adequate confidence in her stack, Alice needs to perform this trust calculation with every single component she uses -- which, as a reminder, can number in the dozens. For some applications, that level of trust isn’t a huge problem. For others, such as those sensitive ones mentioned above, it can be a dealbreaker.

Fortunately, I don’t have to show you why. Though unintentional, XKCD did a great job illustrating possible nightmare scenarios [here](https://xkcd.com/2166/):

<div class="card-local-media-quarter">
{% responsiveImage, "https://imgs.xkcd.com/comics/stack.png", "" %}
</div>

So: how should Alice deal with this dilemma?

## Minimizing Trust Relationships

Now that we’ve established what a trust relationship is, let’s think about ways Alice could minimize how many of them she has to manage.

### Open source

The easiest (and perhaps most obvious) method is to simply **choose open source components**. For those unfamiliar, “open source” means that the code (or “blueprint”) behind a piece of software is available for the general public to see, research, and, in some cases, use freely. In effect, anyone can go under the hood and understand exactly how that piece of software works.

That’s a powerful advantage for Alice: open source allows her to independently verify for herself that a component of hers is doing what it says it’s doing and not behaving maliciously. With that guarantee, she no longer needs to blindly trust its creator -- and, thus, no longer needs to maintain a trust relationship. Hooray!

Except… not quite. Open source software isn’t a magical silver bullet for security; there are still some crucial unaddressed concerns:

- How does Alice know the finished piece of software she’s actually running corresponds to the code that was published for it?
- Auditing and truly understanding how a piece of software works is time-intensive, and rather infeasible for Alice to do with every single part of her stack.
- Malicious open source software can exist and be used if nobody audits it.

There are ways to address those concerns some, but that’s beyond the scope of… whatever this blog post has become. ¯\\\_(ツ)_/¯

All that said, though, the point stands: Alice can generally be less worried about trusting an open source component in her stack to not misbehave.

### Consolidate component providers

It’s very possible, however, that open source might just not be an option for Alice. In that case, a “blind trust relationship” is more or less inevitable.

But _which_ trust relationship matters: suppose Alice has options between two components -- one made by third party A, and another made by third party B. Let’s also say Alice already has a trust relationship with third party A for a different component in her stack. By choosing the latter, she would have to form a _new_ trust relationship, whereas if she chooses the former, she would not have to -- she already trusts third party A. In this way, she can **consolidate** her trust relationships to a smaller set of trusted parties. (This is actually the sales pitch for a number of infrastructure companies -- “trust us, and you get an entire stack from one party”.)

### Make abuse impossible, and eliminate the need for trust

The final option proves to be the holy grail for trusted computing, and it’s the approach used by Enarx: **what if Alice could secure her data in such a way that black-box components couldn’t abuse it, even if they _were_ malicious?** This would be ideal, since Alice would no longer need to trust many components to begin with -- and, in doing so, would not need to form trust relationships at all.

As it turns out, this is possible with a recent innovation in processor design called [**Trusted Execution Environments**](https://en.wikipedia.org/wiki/Trusted_execution_environment), or TEEs. In a nutshell, a small part of the CPU (the “brain” of the computer) becomes dedicated to running code and using data from one particular source. Any software not from that source that attempts to interfere with whatever is running on the TEE gets blocked by the CPU itself, and thus greatly restricts the kind and severity of malicious actions that can be taken. (An example of something that _could_ still happen is an availability attack: where malicious software attempts to starve the machine’s resources to prevent legitimate software from doing its job. This is problematic, but not as catastrophic as data loss, for example.)

<div class="card-local-media-half">
{% responsiveImage, "content/personal/enarx-stackdiagram-tee.svg", "" %}
</div>

If Alice chooses to run her software using a TEE, then any other component in her stack -- malicious or not -- simply can’t abuse her data! (Or, at least, that’s the idea. TEEs are new and… [rough](https://arstechnica.com/information-technology/2020/03/hackers-can-steal-secret-data-stored-in-intels-sgx-secure-enclave/) around the [edges](https://www.anandtech.com/show/14587/vulnerability-in-amds-secure-encrypted-virtualization-for-epyc-update-now-to-build-22). They have bugs. But the fundamental concept is sound.) In any case, use of a TEE means that everything else in the system besides the CPU and its associated firmware doesn’t _need_ to be trusted to start with. In effect, the only trust relationship Alice needs is with the CPU manufacturer -- which is necessary in any case, since every computer must have a CPU. (If you’ve figured out a way to compute without a processor, get in touch with the ACM -- I’m sure they’ll have a [Turing Award](https://en.wikipedia.org/wiki/Turing_Award) ready and waiting for you. 😉)

The trouble with this technology, and the reason for Enarx’s existence, is that there are many vastly different implementations across the industry -- and none of them are standardized. As such, it often takes a lot of developer effort to make use of TEEs, and it’s hard to move between them. In a sentence, Enarx’s mission is to abstract all these complications away and make deploying software on TEEs as effortless as possible for people who only care about the security guarantees.

If you’re interested in learning more, please check out the project’s website at [enarx.dev](https://enarx.dev).

## Wrapping up

While I’m still working with Red Hat’s Office of the CTO Security team, my time working on Enarx has come to an end; I’ve recently been ramping up on other security-focused open source projects. That doesn’t diminish my enthusiasm for its goals: in case you can’t already tell, I _really_ like talking about all this. Computer security and privacy have always fascinated me, and working on Enarx has helped crystallize my thoughts on those topics in a very satisfying way. I hope my expression of those thoughts was understandable, and hopefully interesting.

I plan to publish a follow-up to this post where I discuss how the structured definitions of trust defined here can help regular people think about their approach to online privacy. (I was originally going to do one long post, but that became very unwieldy very quickly…)

Thanks for reading! Feel free to get in touch if you’d like to discuss further. And finally, I’d like to quickly thank:

- Enarx’s project lead, [Mike Bursell](https://aliceevebob.com/), for his time proofreading these very scattershot thoughts -- very much appreciated.
- The Enarx project, for the select few slides I used from our slide deck (full deck [here](https://github.com/enarx/enarx.github.io/blob/master/docs/enarx_slides_2020-12.pdf).)

_Header courtesy of [NOAA on Unsplash](https://unsplash.com/photos/ZVhm6rEKEX8)_
