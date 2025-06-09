# Brainstorming Meeting - 4/27/25

## Attendees: 
- Andrew
- Abdirahman
- Khuyen
- Ferrari
- Anna
- Chakshan
- Yanhua Liu
- Joshua Caneday

## Meeting Logistics
- Time start: 2:00 pm
- Time end: 5:00 pm
- Location: remote / discord voice call
- Tools used: Miro, Google docs

## Main Ideas Considered
### Gacha Game
#### Description
- Pull random cards
- Cards should follow a theme like Pokemon
- Maybe sell cards to get more chances at pulling
- Each card has a random rarity; rare cards are less likely to be pulled
- Has a library so users can see their collections
- Provide an engaging experience that keeps the user excited to draw cards
- Fun and immersive atmosphere with captivating animations

#### Risks and Rabbit Holes
- Fine grain detail is a must for users to be engaged in the experience
- The assets for the cards must be high quality and desireable to have for the user
- The question of how to get or generate the assets is still an open question
- A lot of competition

### Dictionary Cards (Flash Cards)
#### Description
- Use flash cards to each users new languages 
- Translate common words from Engish to other languages
  - We have Mandarin, Cantonese, Russian, Somali, Spanish, Vietnamese
- Use Google Translate or Deepl API to do the translation

#### Risks and Rabbit Holes
- How well can someone learn a new language from flash cards?
- Not an easy way to teach grammar
- May be better as a general flash card app than language
- Duoling is a big competitor

### Todo Board
#### Description
- Like a todo app but with the additional feature that users can arrange their tasks on a board like a bulletin board to better visualize and group them and move them around as they like
- Like putting stick notes on a whiteboard
- The todo items are cards that have their title on the front side and extra details can be on the back side
- It should feel very easy and fast to create tasks and move them around
- Needs to have as little friction as possible

#### Risks and Rabbit Holes
- Some users may not find the card / board view that useful
- An infinite canvas might be necessary for large amounts of cards; not sure how to implement this
- Need a way to save the tasks and layout
- Dealing with user interaction edge cases like overlapping cards, moving them off the screen, snapping position, etc.
- A lot of competitors

### Teaching Sorting Algorithms
#### Description
- Provide an interactive demo for teaching sorting algorithms by creating a "game" for users to sort playing cards
- In the bubble sort demo, the user could be prompted during each step of the algorithm whether to swap the cards or not and the app will show a swapping animation.
- In the merge sort demo, the user could be prompted to decide which card to add first to merge two list of cards

#### Risks and Rabbit Holes
- The card motif could be being stretched a bit here
- A lot of simulation sites already exist
- It may be difficult to handle the logic for more complex algorithms

### (Pokemon) Card Binder / Card Collector
#### Description
- Aimed at card collectors for a particular franchise
- Stores their cards and displays them in a tabular layout
- Has searching, sorting, and filter features
- It should be fast and easy for the users to find and view their cards
- It should be aesthetic to complement the graphic design of the cards

#### Risks and Rabbit Holes
- Users may not find a use for scanning their cards and uploading them if they have physical cards
- May need to be integrated as a part of something; as a stand-alone it might not be very attractive

### Memory Trainer
#### Description
- Displays all cards facing down in a randomized placement
- User flips over cards with the aim of find matches
- The user will continue until all matches are found
- Goal is to find all matches in as few moves as possible
- Should be fun for the user and help improve their memory

#### Risks and Rabbit Holes
- A lot of competition
- Many games similar exist already
- May need to be integrated as a part of something; as a stand-alone it might not be very attractive 


## Decision Matrix

| Idea        | Implementation | Simplicity | Viability | Creativity |
|-------------|----------------|------------|-----------|------------|
| Gacha       | 7.5 | 4 | 5 | 1|
| Flash Cards | 3 | 3 | 3 | 3 |
| Todo Board | 7 | 2 | 3 | 6 |
| Sorting Algs | 5 | 6.5 | 2.5 | 7 |
| Card Binder | 4 | 2.5 | 2 | 2 |
| Memory Game | 2 | 2 | 3.5 | 2|


## Final Decision
We decided to create a Gacha style game through collective vote. Our reasons for this decision include its affinity with the card theme, the fun aspect to it, and its room for extensibility, and the flexibility of the idea.