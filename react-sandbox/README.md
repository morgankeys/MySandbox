# About this branch
This README is for the `cell-patterns` branch. I was exploring a customer request to make cell high-lighting more accessible. Our app provided a way to highlight values with a set of 5 pastel colors. Unfortunately, this is problematic for color-blind users. 

In this experiemnt, I tried adding SVG backgrounds to cells to make them easier to differentiate. I used a color-blindness simulator plugin for chrome to view the patterns.

ULtimately, we decided these patterns were very distracting and hard to look at. And while we could try subtler visual treatments, we realized that we could more elegantly solve the problem by simply adding small letters (A, B, C, etc) to cells.

# About this sandbox-folder
This folder is for quickly building React-apps. The boiler plate is set up so that I can focus on small pieces of functionality (a button, a flex layout, etc) immediately.