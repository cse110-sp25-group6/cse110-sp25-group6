# Collection Team Meeting 5/23/25

## Members Present

- Chakshan Kothakota  
- Joshua Caneday  
- Atharva Kedia

## Current Progress:

* Layout:  
  * Header  
  * Collection grid view  
  * Sorting sidebar  
* Sorting functionality  
  * Name  
  * Rarity  
  * Acquisition

## Issues / Backlog:

- [ ] Cannot scroll all the way to bottom \- Chakshan  
      * Display cards with flexbox instead of grid  
      * Change overall layout to use grid  
- [x] ~~Link back button to homepage~~  
- [ ] Card components need improvements: \- Joshua  
      * Fixed aspect ratio  
      * More readable information  
      * Not fixed height; should be able to set height and have it scale responsively  
- [ ] Secondary sort  
      * By ID?  
- [ ] Improve page styling \- Atharva  
      * Color scheme  
        * Use CSS variables  
        * Some ideas:  
          * Primary, secondary, accent  
          * Background, surface, text/foreground, border/divider  
        * Color palettes: [https://colorhunt.co/](https://colorhunt.co/)   
      * Add ability to choose font

## Enhancements / New Features:

* Inspect card view  
  * Add popup to view image of card better and additional details  
    * Implementation ideas: use dialog html element  
  * (reach feature) Arrows on left and right of the popup to linearly go through the cards in the collection in this inspect format