using Server_side.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server_side.Controllers
{
    public class FavoritesController : ApiController
    {
        // GET api/<controller>
        public List<Favorite> Get(int userId)
        {
            Favorite fav = new Favorite();
            return fav.GetAllUserFavorites(userId);
        }

        // GET api/<controller>/5
        public int Post([FromBody] Favorite fav, int userId)
        {
            return fav.AddFavoriteToUser(userId);
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public int Delete(int userId, string favUrl)
        {
            Favorite fav = new Favorite();
            return fav.RemoveFavorite(userId, favUrl);
        }
    }
}