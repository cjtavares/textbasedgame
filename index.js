const inquirer = require('inquirer');

const orgCharStats = {
    atk: 0,
    def: 0,
    speed: 0,
    magic: 0, 
    name: "",
    class: "",
    gold: 5,
    hp: 20, 
};

let charStats = {};

// class enemy {
//     constructor(atk, def, hp,)
// }

class Armor {
    constructor(speed, def, cost) {
      this.speedPen = speed;
      this.def = def;
      this.cost = cost;
    }};

const heavyArmor = new Armor(3,3,10);
const medArmor = new Armor(2,2,5);
const lightArmor = new Armor(1,1,2); 


const classBonus = (response) => {switch (response) {
    case "Fighter Atk:2 Def:0 Speed:0 Magic:0":
        charStats.atk += 2;
        charStats.class = `Fighter`;
        break;  
    case "Paladin Atk:0 Def:2 Speed:0 Magic:0":
        charStats.def += 2;
        charStats.hp += 2;
        charStats.class = `Paladin`;
        break; 
    case "Rouge Atk:0 Def:0 Speed:2 Magic:0":
        charStats.speed += 2;
        charStats.class = `Rouge`;
        break;  
    case "Wizard Atk:0 Def:0 Speed:0 Magic:2":
        charStats.magic += 2;
        charStats.class = `Wizard`;
  }
};

const humanBonus = () => {inquirer.prompt([
    {
      type: 'list',
      message: 'Human bonus choice',
      name: 'human',
      choices: ['(+1 Atk)', '(+1 Def)', '(+1 Speed)', '(+1 Magic)']
    }])
    .then((response) => {switch (response.human) {
      case "(+1 Atk)":
          charStats.atk += 1;
          playerName();
          break; 
      case "(+1 Def)":
          charStats.def += 1;
          charStats.hp += 1;
          playerName();
          break;  
      case "(+1 Speed)":
          charStats.speed += 1;
          playerName();
          break;
      case "(+1 Magic)":
          charStats.magic += 1;
          playerName();
    }})
};
  

  const raceBonusPlus = (response) => {switch (response) {
    case "Human(+1 to stat of your choice)":
         humanBonus();
         break;
    case "Half-ork (+1 Atk)":
        charStats.atk += 1;
        playerName();
        break; 
    case "Dwarf (+1 Def)":
        charStats.def += 1;
        charStats.hp += 1;
        playerName();
        break;  
    case "Half-elf (+1 Speed)":
        charStats.speed += 1;
        playerName();
        break;
    case "Elf (+1 Magic)":
        charStats.magic += 1;
        playerName();
  }};


  const raceBonus = () => {inquirer.prompt([
    {
      type: 'list',
      message: 'Pick your Race:',
      name: 'race',
      choices: ['Human(+1 to stat of your choice)', 'Half-ork (+1 Atk)', 'Dwarf (+1 Def)', 'Half-elf (+1 Speed)', 'Elf (+1 Magic)' ]
    }])
  .then((response) => {
    raceBonusPlus(response.race)
  })};

  const playerName = () => {inquirer.prompt([
    {
      type: 'Input',
      message: `What is your Name ${charStats.class}?`,
      name: 'name',
    }])
  .then((response) => {
    charStats.name = response.name
    // console.log(charStats)
    startAdventure()
  })};

  const startAdventure = () => {inquirer.prompt([
    {
      type: 'list',
      message: `Start Adventure?`,
      name: 'start',
      choices: [`I'm ready for an adventure!`, `No, not yet. (Build a different character)`]
    }])
  .then((response) => {switch (response.start) {
    case "I'm ready for an adventure!":
         
         break;
    case `No, not yet. (Build a different character)`:
      charStats = {};
      console.log(charStats);
      init();
        
  }  
  })};


  const init = () => {inquirer.prompt([
    {
      type: 'list',
      message: 'Pick your class:',
      name: 'class',
      choices: ['Fighter Atk:2 Def:0 Speed:0 Magic:0', 'Paladin Atk:0 Def:2 Speed:0 Magic:0', 'Rouge Atk:0 Def:0 Speed:2 Magic:0', 'Wizard Atk:0 Def:0 Speed:0 Magic:2' ]
    }])
  .then((response) => {
    charStats = orgCharStats;
    classBonus(response.class);
    raceBonus();
  });

  };

  init()
 