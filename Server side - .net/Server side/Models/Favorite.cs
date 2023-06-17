using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server_side.Models
{
    public class Favorite
    {
        private int favId;
        private string author;
        private string content;
        private string description;
        private string publishedAt;
        private string journal;
        private string url;
        private string picture;
        private string title;

        public Favorite(int favId,string title, string author, string content, string description, string publishedAt, string journal, string url, string picture)
        {
            this.FavId = favId;
            this.Author = author;
            this.Content = content;
            this.Description = description;
            this.PublishedAt = publishedAt;
            this.Journal = journal;
            this.Url = url;
            this.Picture = picture;
            this.Title = title;
        }

        public Favorite(string title, string author, string content, string description, string publishedAt, string journal, string url, string picture)
        {
            this.Author = author;
            this.Content = content;
            this.Description = description;
            this.PublishedAt = publishedAt;
            this.Journal = journal;
            this.Url = url;
            this.Picture = picture;
            this.Title = title;
        }

        public Favorite() { }

        public int FavId { get => favId; set => favId = value; }

        public int RemoveFavorite(int userId, string favUrl)
        {
            return DBservices.DeleteFavorite(userId, favUrl);
        }

        public string Author { get => author; set => author = value; }
        public string Content { get => content; set => content = value; }
        public string Description { get => description; set => description = value; }
        public string PublishedAt { get => publishedAt; set => publishedAt = value; }
        public string Journal { get => journal; set => journal = value; }
        public string Url { get => url; set => url = value; }
        public string Picture { get => picture; set => picture = value; }
        public string Title { get => title; set => title = value; }

        public int AddFavoriteToUser(int userId)
        {
            return DBservices.AddFavoriteToUser(this, userId);
        }

        public List<Favorite> GetAllUserFavorites(int userId)
        {
            return DBservices.GetAllUserFavorites(userId);
        }
    }
}