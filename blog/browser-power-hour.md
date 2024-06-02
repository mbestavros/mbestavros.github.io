---
layout: layouts/post
title: "browser-power-hour, or: how to benchmark power efficiency of Android web browsers"
subtitle: Is your favorite browser a battery hog? Time to find out!
date: 2024-06-02
header-image: ""
tags:
    - tech
    - development
    - android
---
# I made something cool!

Today, I'm going to be talking about my most recent side project: [`browser-power-hour`](https://github.com/mbestavros/browser-power-hour). In short, it's a tool that helps compare the power efficiency of different Android web browsers.

If you came here from [Reddit]() or [Lemmy](), thanks for stopping by! Feel free to skip the first paragraph - you've already read it.

## Why is this benchmark important?

In Android enthusiast communities, it's pretty common to see battery drain brought up as a reason to use (or avoid) certain web browsers, often without evidence. But browsers are complex and constantly evolving pieces of software... maybe those perceptions are out of date? Maybe they're still valid! Unlike raw performance, there are few, if any, good ways to reliably measure battery impact for an individual app, so it's hard to tell what's actually true. Hence, this project! My goal is to be able to provide _objective metrics_ on browser power efficiency to demystify the battery impact question.

_(Here's my personal, biased, motivation: I like Firefox on Android. I know it probably won't be quite as good as Chrome, a browser made by Google for Google's operating system, especially when running on Google's own Tensor chips... but is it actually materially, measurably worse? I want to test that!)_

## But wait, phones don't give us a ton of useful battery detail to begin with. How can you reliably measure power consumption?

Glad you asked! The answer is [Battery Historian](https://developer.android.com/topic/performance/power/setup-battery-historian). It's a pretty powerful tool, provided by the Android devs themselves, that can measure granular power usage _per app_ on an Android test device. Exactly what we need!

However, all that data is only as meaningful as...

## The test's design

It's helpful to keep in mind that we are benchmarking _the browsers themselves_ - ideally, they should be the only variable. They should perform the exact same tasks as each other with the same time budget. Those tasks should be pretty variable but also repeatable - a mix of light web browsing tasks and harder, more intense things.

I decided on the following task list, which would be repeated across all browsers:

- Navigate to the [Speedometer 3.0 benchmark](https://browserbench.org/Speedometer3.0/) and run it
- Navigate to a number of different (primarily news) websites sequentially, and scroll up and down (in a consistent and repeatable way) on each one
- Run the UFOTest benchmark for half a minute

### Automating the task list

I ended up going with what I knew best and wrote a Python script. It uses the `pure-python-adb` library to connect and send commands to an Android device.

The trickiest bit to get right was getting the script to activate the URL bar on different web browsers. My solution is hacky and horrible, but does work: a large dictionary that contains relative coordinate percentages for the URL bars of many popular web browsers. The script retrieves the device's screen resolution, then uses the relative coordinate value for the current browser to determine the pixel coordinates that should be used to tap on the URL bar. The same trick is used to start Speedometer.

This is the most error-prone part of the test, so it's important to supervise a test run for a bit and make sure that browser navigation and starting Speedometer runs work correctly.

### Getting the results

Once the script is done running the task list for all browsers, it triggers a bug report and `batterystats` dump, which gets written to the computer that's running the Python script. Plug the bug report into the [Battery Historian tool](https://developer.android.com/topic/performance/power/setup-battery-historian#how-to), and results can be compared!

## Please contribute if you are able!

If you actually want to run the benchmark yourself, do follow the [README on Github](https://github.com/mbestavros/browser-power-hour/blob/main/README.md#guide) - it's far more comprehensive than this blog post. I also encourage you to contribute! Whether that's [submitting results](https://github.com/mbestavros/browser-power-hour/discussions/1) for your device or code improvements, all are welcome!
