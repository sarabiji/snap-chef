// src/models/RecipeModel.js
export class RecipeModel {
    constructor(id, title, image, readyInMinutes, ingredients, instructions) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.readyInMinutes = readyInMinutes;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    getIngredientListHtml() {
        return this.ingredients.map(ing => `<li>${ing}</li>`).join("");
    }

    getInstructionListHtml() {
        return this.instructions.map(inst => `<li>${inst}</li>`).join("");
    }

    static fromJson(json) {
        const ingredients = json.extendedIngredients ? json.extendedIngredients.map(i => i.original) : [];
        const instructions = json.analyzedInstructions && json.analyzedInstructions.length > 0 && json.analyzedInstructions[0].steps
            ? json.analyzedInstructions[0].steps.map(s => s.step)
            : [];

        return new RecipeModel(
            json.id,
            json.title,
            json.image,
            json.readyInMinutes,
            ingredients,
            instructions
        );
    }
}