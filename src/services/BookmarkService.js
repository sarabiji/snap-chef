// src/services/BookmarkService.js
import { BookmarkModel } from '../models/BookmarkModel';

const LOCAL_STORAGE_KEY = 'snapChefBookmarks';

const BookmarkService = {
    getAllBookmarks: async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                const bookmarksRaw = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
                resolve(bookmarksRaw.map(BookmarkModel.fromJson));
            }, 500); // Simulate network delay
        });
    },

    isBookmarked: async (id) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const bookmarks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
                resolve(bookmarks.some(b => b.id === id));
            }, 200);
        });
    },

    addBookmark: async (item) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const bookmarks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
                if (!bookmarks.some(b => b.id === item.id)) {
                    // Create a BookmarkModel instance, ensure all fields are present
                    const newBookmark = new BookmarkModel(
                        item.id,
                        item.title,
                        item.image, // Assuming 'image' from item is 'imageUrl' for BookmarkModel
                        item.readyInMinutes,
                        Date.now()
                    );
                    bookmarks.push(newBookmark);
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
                    resolve(true);
                } else {
                    resolve(false); // Already bookmarked
                }
            }, 300);
        });
    },

    removeBookmark: async (id) => {
        return new Promise(resolve => {
            setTimeout(() => {
                let bookmarks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
                const initialLength = bookmarks.length;
                bookmarks = bookmarks.filter(b => b.id !== id);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
                resolve(bookmarks.length < initialLength); // True if something was removed
            }, 300);
        });
    }
};

export default BookmarkService;