// src/services/RecipeService.js
import { RecipeModel } from '../models/RecipeModel';

const RecipeService = {
    fetchRecipeDetails: async (id) => {
        return new Promise(resolve => {
            setTimeout(() => {
                // Mock recipe data - in a real app, this would be your API call
                const mockRecipeData = {
                    id: id,
                    title: `Delicious Recipe ${id} Title`,
                    image: `https://via.placeholder.com/600x400?text=Recipe+${id}`,
                    readyInMinutes: 25 + (id * 2),
                    extendedIngredients: [
                        { original: "2 cups all-purpose flour" },
                        { original: "1 cup granulated sugar" },
                        { original: "3 large eggs" },
                        { original: "1 tsp baking powder" },
                        { original: "1/2 cup milk" },
                        { original: "1/4 cup unsalted butter, melted" }
                    ],
                    analyzedInstructions: [
                        {
                            steps: [
                                { step: "Preheat oven to 350°F (175°C)." },
                                { step: "In a large bowl, whisk together flour, sugar, and baking powder." },
                                { step: "In a separate bowl, whisk eggs, milk, and melted butter." },
                                { step: "Pour wet ingredients into dry ingredients and mix until just combined. Do not overmix." },
                                { step: "Pour the batter into a greased 9x13 inch baking pan." },
                                { step: "Bake for 30-35 minutes, or until a wooden skewer inserted into the center comes out clean." },
                                { step: "Let cool in the pan for 10 minutes before transferring to a wire rack to cool completely." }
                            ]
                        }
                    ],
                    // Add other mock fields as needed for detail screen (e.g., summary, winePairing, etc.)
                };
                resolve(RecipeModel.fromJson(mockRecipeData));
            }, 800); // Simulate network delay
        });
    },

    // You might also have methods for fetching lists of recipes, search, etc.
    searchRecipes: async (query, filters) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const mockSearchResults = [
                    { id: 101, title: `Search Result: ${query || 'Pasta'}`, image: 'https://via.placeholder.com/200x150?text=Pasta', readyInMinutes: 30 },
                    { id: 102, title: `Search Result: ${filters[0] || 'Chicken'}`, image: 'https://via.placeholder.com/200x150?text=Chicken', readyInMinutes: 45 },
                    { id: 103, title: `Another: ${query || 'Soup'}`, image: 'https://via.placeholder.com/200x150?text=Soup', readyInMinutes: 20 },
                ];
                resolve(mockSearchResults.map(RecipeModel.fromJson));
            }, 700);
        });
    }
};

export default RecipeService;