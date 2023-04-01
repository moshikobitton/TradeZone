using Server_side.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server_side.Controllers
{
    public class UsersController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }


        // POST api/<controller>
        [HttpPost]
        public int AddUser([FromBody] User user,string pwd)
        {
            user.Pwd = pwd;
            return user.InsertUser();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        [HttpPost]
        public User POST(string email, string pwd)
        {
            User u = new User(email, pwd);
            return u.GetLoginUser();
        }

        [HttpPost]
        public User POST([FromBody] User user)
        {
            return user.GetLoginUser();
        }
        
        public int Get(string email)
        {
            User u = new User();
            return u.IsEmailExist(email);
        }
    }
}