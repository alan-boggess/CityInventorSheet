import accuracyRecipes from './accuracy';
import damageRecipes from './damage';
import defenseRecipes from './defense';
import enduranceRecipes from './endurance';
import healingRecipes from './healing';
import holdRecipes from './hold';
import jumpRecipes from './jump';
import rechargeRecipes from './recharge';
import tauntRecipes from './taunt';


export class Progress {
    constructor(props) {
        this.Badges = {};
        
        let masterRecipeMap = {
            "Accuracy": accuracyRecipes,
            "Damage": damageRecipes,
            "Defense": defenseRecipes,
            "Endurance": enduranceRecipes,
            "Healing": healingRecipes,
            "Hold": holdRecipes,
            "Jump": jumpRecipes,
            "Recharge": rechargeRecipes,
            "Taunt": tauntRecipes
        };

        for (var recipeType in masterRecipeMap) {
            this.Badges[recipeType] = structuredClone(masterRecipeMap[recipeType]);
            for (var level in this.Badges[recipeType]) {
                this.Badges[recipeType][level]["crafted"] = 0;
            }
        }
    }
}