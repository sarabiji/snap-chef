// src/models/BookmarkModel.js
export class BookmarkModel {
    constructor(id, title, imageUrl, readyInMinutes, timestamp) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.readyInMinutes = readyInMinutes;
        this.timestamp = timestamp || Date.now();
    }

    getFormattedDate() {
        const date = new Date(this.timestamp);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    static fromJson(json) {
        return new BookmarkModel(
            json.id,
            json.title,
            json.imageUrl,
            json.readyInMinutes,
            json.timestamp
        );
    }
}