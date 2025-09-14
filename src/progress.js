import accuracyRecipes from './accuracy';
import damageRecipes from './damage';
import defenseRecipes from './defense';
import enduranceRecipes from './endurance';
import healingRecipes from './healing';
import holdRecipes from './hold';
import jumpRecipes from './jump';
import rechargeRecipes from './recharge';
import tauntRecipes from './taunt';
import { BiCopy } from "react-icons/bi";


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

export function getShoppingList(progress) {
    var shoppingList = {};
    var inf_cost = 0;
    for (var recipeType in progress.Badges) {
        for (var level in progress.Badges[recipeType]) {
            var this_recipe = progress.Badges[recipeType][level]
            var crafted = this_recipe['crafted'];
            var needed = this_recipe['total_needed'];
            var still_needed = needed - crafted;
            inf_cost += still_needed * (this_recipe['recipe_purchase_cost'] + this_recipe['crafting_cost']);
            for (var salvage in progress.Badges[recipeType][level]['salvage']) {
                if (salvage in shoppingList) {
                    shoppingList[salvage] += progress.Badges[recipeType][level]['salvage'][salvage] * still_needed;
                }
                else {
                    shoppingList[salvage] = progress.Badges[recipeType][level]['salvage'][salvage] * still_needed;
                }
            }
        }
    }
    shoppingList["inf_cost"] = inf_cost;
    return shoppingList;
};

export function renderShoppingList(shoppingList) {
    var returnRows = [["Total Influence Cost", shoppingList['inf_cost']]]
    for (var l in shoppingList) {
        if (l != "inf_cost") {
            returnRows.push([l, shoppingList[l]])
        }
    }
    var rowsAsString = "";
    for (var r in returnRows) {
        rowsAsString += returnRows[r][0] + ":  " + returnRows[r][1] + '\n';
    }
    return <>
        <button type="button" class="btn" onClick={() => {navigator.clipboard.writeText(rowsAsString)}}>
            <BiCopy />
        </button>
        {returnRows.map(l => <ul>{l[0]}:  {l[1]}</ul>)}
    </>    
 }