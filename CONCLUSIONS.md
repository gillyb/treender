CONCLUSIONS
===========

+ First make sure deployment is simple (either by single command, or automatic github push) before starting to work
  on anything else. This will make the process faster and much easier.
  NOTE: Look into zeit (now) for this. and nextjs
+ Using plugins - make sure they're fully cross-platform (had problem with specific jquery tinder swipe plugin that
  wasn't supported properly on FireFox).
+ Relative sizes: font-size should be 'rem' and padding/margins should be 'em'

+ See if I can automatically adjust svg files coming from sketch/invision
  Removing useless sections (like id, title, and redundant 'g' scopes, and inlining styles)

TIME ESTIMATION
===============
+ Take into account all the small things that will go with every project, regardless of size
  + Setting up domain (and hosting)
  + Setting up build process (webpack, minify, upload)
  + favicon
  + social metadata (fb opengraph, twitter)
  + analytics (setting up Google Analytics, defining events, and testing)
+ Adjusting for mobile responsiveness took much longer than i thought
  NOTE: See if next time I should rely on better UI framework for mobile responsiveness
+