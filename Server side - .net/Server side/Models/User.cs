using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server_side.Models
{
    public class User
    {
        string email;
        string pwd;
        int userId;
        string first_name;
        string last_name;

        public User() { }

        public User(string email, string pwd, int userId, string first_name, string last_name)
        {
            this.Email = email;
            this.Pwd = pwd;
            this.UserId = userId;
            this.First_name = first_name;
            this.Last_name = last_name;
        }

        public User(string firstName, string lastName, string email)
        {
            this.First_name = firstName;
            this.Last_name = lastName;
            this.Email = email;
        }

        public User(string email, string pwd)
        {
            this.Email = email;
            this.Pwd = pwd;
        }

        public string Email { get => email; set => email = value; }
        public string Pwd { get => pwd; set => pwd = value; }
        public int UserId { get => userId; set => userId = value; }
        public string First_name { get => first_name; set => first_name = value; }
        public string Last_name { get => last_name; set => last_name = value; }


        public int InsertUser()
        {
            return DBservices.InsertUser(this);

        }

        public User GetLoginUser()
        {
            return DBservices.GetLoginUser(this);
        }

        public int IsEmailExist(string email)
        {
            return DBservices.IsEmailExist(email);
        }
    }
}