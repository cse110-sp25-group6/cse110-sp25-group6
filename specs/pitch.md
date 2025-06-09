# 🎴 Gacha Card Collector Game

## 🌟 Overview

### 💡 Project Idea  
**Gacha Card Collector Game** (Theme TBD)  

### 🎯 Goal & Objective  
Give users the excitement of discovering new cards and building their own personalized collections.

---

## ✅ Base Requirements

### 👤 User Personas

- **9–5 Worker:** Wants an escape from work to relax and have fun.  
- **Collector:** Enjoys completing collections for a sense of achievement.  
- **Gambler:** Seeks a safe thrill from lucky wins as an alternative to gambling.  
- **Student:** Wants to collect the best cards and compete with friends.

---

## 🎮 Main Qualities

- Fun for the user  
- Allows user to build and show off collections  
- Includes an element of luck  
- Cards are desirable and worth showing off  

---

## 📈 Non-Functional Requirements (The "-ilities")

- **Utility**  
- **Availability**  
- **Performance** (RAIL: Response <100ms, Animation 60fps, Idle 50ms, Load <1s)  
- **Accessibility**  
- **Usability**  
- **Satisfaction**

---

## ⛓️ Constraints

- **Technical:** Must use HTML, CSS, JavaScript (No multiplayer/network features)  
- **Logistic:** Development time limited to 3.5 weeks  

---

## 🧩 Core Features

- Pull cards / open packs  
- Add to / modify card collection  
- View / display card collection  

---

## ➕ Additional Features

- Sort collection (e.g., by rarity, name)  
- Timeout between opening packs  
- Sell cards for currency (used to skip cooldowns)  
- Animations, sound effects, background music  

---

## 🗺️ Site Mapping

Miro Board: [View Site Map](https://miro.com/app/board/uXjVI1_IMj4=/)

---

## 🏆 MVP Features

### 🎰 Gacha Mechanics

- Open packs using in-game currency  
- Currency regenerates over time  
- **Pity System** (subject to change):  
  - After 10 poor pulls, chance for rare card increases  

### 📄 Pages

- **Pack Page**  
- **Library Page**  
- **Pack Opening Page**  
- Animations for pack opening  
- High-rarity cards glow/highlighted  
- Interactions: Clicking, swiping  
- Back and Home buttons (Top-left)  
- Currency/Packs displayed (Top-right)

---

## 🧠 Game Logic

### 🪙 In-Game Currency

- Used to open packs  
- Automatically regenerates  
- Can be earned via selling cards  

### 🧬 Card Mechanics

- Duplicate cards can be combined to level up  
- Cards have variations:
  - E.g., Legendary Powell → **Ultra Legendary "Christmas Powell"** (Time-gated)  

#### 🧪 Example Cards

- **Common:** Laptop → Razer Laptop, MacBook  
- **Common:** Mousepad  
- **Rare:** Nvidia 5090 Ti, Tony (TA)  
- **Epic:** Andrew Zhao  
- **Super Rare:** Powell in Star Wars costume  

---

## 📊 Graph/Pattern Ideas (Card Designs)

- Math/Pattern-themed visuals:
  - **Functions:** Parabola, Sine, Tangent  
  - **Polar:** Rose Curves, Cardioids  
  - **Fractals:** Mandelbrot Set, Sierpinski Triangle  
  - **Other:** Lissajous, Fourier, Gauss  

---

## 🗃️ Collection Features

- Store pulled cards in **Local Storage**  
- Display library of owned cards  
- View individual card info  
- Sorting options:
  - By rarity  
  - Alphabetically  
  - By card ID  

#### 💡 Good Reference: [Wish Simulator](https://wishsimulator.app/)

---

## 🧾 Specifications

### 🧱 Card JSON Structure

```json
{
  "Id": 1,
  "Name": "Legendary Powell",
  "Image": "https://link-to-image.com",
  "Aquisition": "2025-06-09T00:00:00.000Z",
  "Rarity": 5,
  "Stats": {
    "Health": 100,
    "Damage": 100
  },
  "misc": {}
}
```

Each card should be able to **generate an HTML card** from this JSON object.

---

## 📄 Pages (HTML/CSS)

- Every page must:
  - Show **currency & pack count** (top-right)
  - Use **localStorage** to persist data  
  - Have **Back/Home buttons** (top-left) with consistent arrow icon  

### 🏠 Home Page (`index.html` / `index.css` / `index.js`)

- User profile on top-right (from localStorage)  
- Pack opening UI in the center  
- Under pack:
  - # of packs
  - Progress bar for next pack (based on account creation time)  
- Collection button on the side (style TBD)  

---

## 📦 Pack Opening Page (`pack.html`, `pack.css`, `pull.js`)

- Pack UI remains front and center  
- Below the pack:  
  - **Two buttons**: “Open 1 Pack” and “Open 10 Packs”  
  - If not enough packs, numbers on buttons should turn **red**  
  - **Button shapes TBD**  
  - If insufficient packs → Prompt for **gems**  
    - (Gems are infinite for now; future: unlock via missions/achievements)  
  - If not enough gems → Show **popup warning**

### 🔁 After Opening

- Display all acquired cards  
- **Back** button (top-left)  
- **Open Again** button (below cards):  
  - Repeats last pull count (1 or 10)

### ⭐ Optional Features

- Click a card → Blow up view, blur background  
- Click anywhere to close

### 🔟 On 10-Card Pulls

- Each pack should have its **own section**  
- Scroll through sections to view all  

---

## 📚 Collection Page (`collection.html?`)

- Populate from array of card objects in **localStorage**

### 🔽 Sorting

- Sorting dropdown in header  
- Default: Sort by **acquisition date**  
- On change:
  - Re-sort the user’s card array  
  - Sort by **rarity**, then **alphabetically** if equal rarity  

### 📐 Layout

- Cards shown in **grid layout**  
- 2–3 rows by default  
- Incomplete rows can be filled with shadows/placeholders (optional)

### 🔍 Optional: Card Inspect Page

- Click a card → Navigate to card detail view  
- Card is enlarged with a **side panel** for details  
- Navigation arrows on each side:
  - Wrap around to beginning/end of array  
  - Smooth transition between cards

---

## 💾 Local Storage Format

```json
{
  "Username": "guest",
  "AccountCreateTime": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "UsrLvl": 1.34,
  "PacksOpened": 42,
  "Gems": 999,
  "Packs": 5,
  "Collection": [{}, {}, {}],
  "Misc": {}
}
```

---
