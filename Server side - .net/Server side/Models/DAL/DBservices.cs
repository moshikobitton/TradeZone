using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace Server_side.Models
{
    public static class DBservices
    {
        // Read by COU 
        public static List<Trade> ReadByCOU(string cou, char flow)
        {
            SqlConnection con = Connect();
            SqlCommand command;
            if (flow == 'X')
                command = CreateReadCommand(con, "spReadTradesByCOU", cou);
            else
                command = CreateReadCommand(con, "spReadTradesByPAR", cou);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                int year = Convert.ToInt32(dr["TIME"]);
                long tradeId = long.Parse(dr["ID"].ToString());

                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Read Top 10 trades
        public static List<Trade> ReadTop10Trades()
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadTop10TradesCommand(con);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string ind = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                int year = Convert.ToInt32(dr["TIME"]);
                long tradeId = long.Parse(dr["ID"].ToString());


                trades.Add(new Trade(couISO, parISO, ind, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Top 10 trades command
        private static SqlCommand CreateReadTop10TradesCommand(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();
            command.CommandText = "spGetTop10Trades";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Get all trades count
        public static int GetAllTradesCount()
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateGetTotalTradesCommand(con);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            int count = 0;
            while (dr.Read())
            {   
                count = Convert.ToInt32(dr["totalTrades"]);
            }

            con.Close();
            return count;
        }

        // Create Read command for total trades
        private static SqlCommand CreateGetTotalTradesCommand(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();
            command.CommandText = "spGetTotalTrades";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Read by IND
        public static List<Trade> ReadTradesByInd(string ind)
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadByAttrCommand(con, "spReadTradesByInd", ind);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                int year = Convert.ToInt32(dr["TIME"]);
                long tradeId = long.Parse(dr["ID"].ToString());


                trades.Add(new Trade(couISO, parISO, ind, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Read by IND + YEAR
        public static List<Trade> ReadTradesByIndAndYear(string ind, int year)
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadByIndAndYearCommand(con, "spReadTradesByInd&Year", ind, year);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                long tradeId = long.Parse(dr["ID"].ToString());

                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Read by COU/PAR + YEAR + FLOW
        public static List<Trade> ReadByCOU(string cou, char flow, int year)
        {
            SqlConnection con = Connect();
            SqlCommand command;
            if (flow == 'X')
                command = CreateReadCommand(con, "spReadTradesByCOU&Year", cou, year);
            else
                command = CreateReadCommand(con, "spReadTradesByPAR&Year", cou, year);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                long tradeId = long.Parse(dr["ID"].ToString());

                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Read by COU/PAR + YEAR + FLOW + IND
        public static List<Trade> ReadByCOU(string cou, char flow, int year, string ind)
        {
            SqlConnection con = Connect();
            SqlCommand command;
            if (flow == 'X')
                command = CreateReadCommand(con, "spReadTradesByCOU&Year&Ind", cou, year, ind);
            else
                command = CreateReadCommand(con, "spReadTradesByPAR&Year&Ind", cou, year, ind);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                long tradeId = long.Parse(dr["ID"].ToString());

                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Create read command for COU/PAR + YEAR + FLOW
        private static SqlCommand CreateReadCommand(SqlConnection con, string text, string cou, int year)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@countryISO", cou);
            command.Parameters.AddWithValue("@year", year);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create read command for IND + YEAR
        private static SqlCommand CreateReadByIndAndYearCommand(SqlConnection con, string text, string ind, int year)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@ind", ind);
            command.Parameters.AddWithValue("@year", year);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create read command for COU/PAR + YEAR + FLOW + IND
        private static SqlCommand CreateReadCommand(SqlConnection con, string text, string cou, int year, string ind)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@countryISO", cou);
            command.Parameters.AddWithValue("@year", year);
            command.Parameters.AddWithValue("@ind", ind);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create Read command for many uses
        private static SqlCommand CreateReadCommand(SqlConnection con, string text, string cou)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@countryISO", cou);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create Read command by IND
        private static SqlCommand CreateReadByAttrCommand(SqlConnection con, string text, string ind)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@ind", ind);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create Read command by IND and YEAR
        private static SqlCommand CreateReadByAttrCommand(SqlConnection con, string text, string ind, int year)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@ind", ind);
            command.Parameters.AddWithValue("@year", year);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Read by COU + PAR
        public static List<Trade> ReadByCOUandPAR(string cou, string par)
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadCommand(con, "spReadTradesByCOU&PAR", cou, par);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                int year = Convert.ToInt32(dr["TIME"]);
                long tradeId = long.Parse(dr["ID"].ToString());


                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Read by COU + PAR + IND
        public static List<Trade> ReadByCouParAndIND(string cou, string par, string ind)
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadCommand(con, "spReadTradesByCouParAndIND", cou, par, ind);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                int year = Convert.ToInt32(dr["TIME"]);
                long tradeId = long.Parse(dr["ID"].ToString());


                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Read by COU + PAR + Year
        public static List<Trade> ReadByCouParAndYear(string cou, string par, int selectedYear)
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadCommand(con, "spReadTradesByCouParAndYear", cou, par, selectedYear);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                int year = Convert.ToInt32(dr["TIME"]);
                long tradeId = long.Parse(dr["ID"].ToString());


                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Read by COU + PAR + IND + Year
        public static Trade ReadByCouParYearAndIND(string cou, string par, string ind, int selectedYear)
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateReadCommand(con, "spReadByCouParYearAndIND", cou, par, ind, selectedYear);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            dr.Read();
            if (!dr.HasRows)
            {
                con.Close();
                return null;
            }
            string couISO = dr["COU"].ToString();
            string parISO = dr["PAR"].ToString();
            string indicator = dr["IND"].ToString();
            float value = Convert.ToSingle(dr["Value"]);
            int year = Convert.ToInt32(dr["TIME"]);
            long tradeId = long.Parse(dr["ID"].ToString());
            Trade trade = new Trade(couISO, parISO, indicator, year, value, tradeId);


            con.Close();
            return trade;
        }

        // Create Read command with COU + PAR
        private static SqlCommand CreateReadCommand(SqlConnection con, string text, string cou, string par)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@couISO", cou);
            command.Parameters.AddWithValue("@parISO", par);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create Read command with COU + PAR + IND
        private static SqlCommand CreateReadCommand(SqlConnection con, string text, string cou, string par, string ind)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@couISO", cou);
            command.Parameters.AddWithValue("@parISO", par);
            command.Parameters.AddWithValue("@IND", ind);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create Read command with COU + PAR + Year
        private static SqlCommand CreateReadCommand(SqlConnection con, string text, string cou, string par, int year)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@couISO", cou);
            command.Parameters.AddWithValue("@parISO", par);
            command.Parameters.AddWithValue("@year", year);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create Read command with COU + PAR + Year + IND
        private static SqlCommand CreateReadCommand(SqlConnection con, string text, string cou, string par, string indicator, int year)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@couISO", cou);
            command.Parameters.AddWithValue("@parISO", par);
            command.Parameters.AddWithValue("@IND", indicator);
            command.Parameters.AddWithValue("@year", year);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Read By Year
        public static List<Trade> ReadByYear(int year)
        {
            SqlConnection con = Connect();
            SqlCommand command;
            command = CreateReadCommand(con, "spReadTradesByYear", year);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                long tradeId = long.Parse(dr["ID"].ToString());

                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Create Read command with year
        private static SqlCommand CreateReadCommand(SqlConnection con, string text, int year)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@year", year);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Read By Cou Par IND
        public static List<Trade> ReadByCouParInd(string cou, string ind, char flow)
        {
            SqlConnection con = Connect();
            SqlCommand command;
            if (flow == 'X')
                command = CreateReadByCouIndCommand(con, "spReadTradesByCOU&IND", cou, ind);
            else
                command = CreateReadByParIndCommand(con, "spReadTradesByPAR&IND", cou, ind);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Trade> trades = new List<Trade>();

            while (dr.Read())
            {
                string couISO = dr["COU"].ToString();
                string parISO = dr["PAR"].ToString();
                string indicator = dr["IND"].ToString();
                float value = Convert.ToSingle(dr["Value"]);
                int year = Convert.ToInt32(dr["TIME"]);
                long tradeId = long.Parse(dr["ID"].ToString());

                trades.Add(new Trade(couISO, parISO, indicator, year, value, tradeId));
            }

            con.Close();
            return trades;
        }

        // Create Read By COU and IND
        private static SqlCommand CreateReadByCouIndCommand(SqlConnection con, string text, string cou, string ind)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@countryISO", cou);
            command.Parameters.AddWithValue("@ind", ind);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create Read By PAR and IND
        private static SqlCommand CreateReadByParIndCommand(SqlConnection con, string text, string cou, string ind)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@countryISO", cou);
            command.Parameters.AddWithValue("@ind", ind);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Read All Products
        public static List<Product> GetAllProducts()
        {
            SqlConnection con = Connect();
            SqlCommand command;
            command = CreateCommand(con, "spGetAllProducts");
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Product> products = new List<Product>();

            while (dr.Read())
            {
                string code = dr["Product_ID"].ToString();
                string details = dr["Details"].ToString();
                int id = Convert.ToInt32(dr["Id"]);
                products.Add(new Product(id, details, code));
            }

            con.Close();
            return products;
        }

        // Create command for bar chart
        private static SqlCommand CreateCommandBarChart(SqlConnection con, string text, string category_code, int year, string country_code)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@category_code", category_code);
            command.Parameters.AddWithValue("@year", year);
            command.Parameters.AddWithValue("@country_code", country_code);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }


        // Create command for line chart
        private static SqlCommand CreateCommandLineChart(SqlConnection con, string text, string category_id, string code)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@category_id", category_id);
            command.Parameters.AddWithValue("@code", code);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create command for geo chart
        private static SqlCommand CreateCommandGeoChart(SqlConnection con, string text, string ind, int year)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@ind", ind);
            command.Parameters.AddWithValue("@year", year);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create command for pie chart
        public static List<Product> DataForPieChart(List<Product> pieChartProducts, string cou, string flow, int year)
        {
            SqlCommand command;

            List<Product> products = new List<Product>();
            string textSP = "";

            if (flow == "Export") textSP = "spExportDataForPieChart";
            else textSP = "spImportDataForPieChart";

            for (int i = 0; i < pieChartProducts.Count(); i++)
            {
                SqlConnection con = Connect();
                command = CreateCommand(con, textSP, cou, year, pieChartProducts[i].Code);
                SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
                List<string> colors = new List<string>() { "hsl(104, 70%, 50%)", "hsl(162, 70%, 50%)", "hsl(291, 70%, 50%)", "hsl(229, 70%, 50%)", "hsl(344, 70%, 50%)" };

                while (dr.Read())
                {
                    string rowInd = dr["IND"].ToString();
                    string Details = dr["Details"].ToString();
                    float sum_values_of_product = Convert.ToSingle(dr["Sum"]);
                    products.Add(new Product(rowInd, sum_values_of_product, colors[i], Details));
                }
                con.Close();
            }
            return products;

        }

        //Get User trying to login
        public static User GetLoginUser(User u)
        {
            SqlConnection con = Connect();
            SqlCommand command;
            command = CreateCommand(con, u);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            User userLogged = null;

            while (dr.Read())
            {
                string firstName = dr["FirstName"].ToString();
                string lastName = dr["LastName"].ToString();
                string email = dr["Email"].ToString();
                userLogged = new User(firstName, lastName, email);
                break;
            }

            con.Close();
            return userLogged;
        }

        //Insert user to DB
        public static int InsertUser(User u)
        {
            SqlConnection con = Connect();
            SqlCommand command;
            command = CreateInsertUserCommand(con, u);
            int numAffected = command.ExecuteNonQuery();
            con.Close();
            return numAffected;
        }
        //Create insert user command
        private static SqlCommand CreateInsertUserCommand(SqlConnection con, User u)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@email", u.Email);
            command.Parameters.AddWithValue("@pwd", u.Pwd);
            command.Parameters.AddWithValue("@first_name", u.First_name);
            command.Parameters.AddWithValue("@last_name", u.Last_name);
            command.CommandText = "spInsertUser";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        //Insert user to DB
        public static int IsEmailExist(string email)
        {
            SqlConnection con = Connect();
            SqlCommand command;
            command = CreateCheckEmailExist(con, email);
            int result = 0;
            object obj = command.ExecuteScalar();
            if (obj != null && obj != DBNull.Value)
            {
                result = (int)obj;
            }
            con.Close();
            return result;
        }
        //Create insert user command
        private static SqlCommand CreateCheckEmailExist(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@email", email);
            command.CommandText = "spIsExistEmail";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }
        //Create command for user login
        private static SqlCommand CreateCommand(SqlConnection con, User u)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@email", u.Email);
            command.Parameters.AddWithValue("@pwd", u.Pwd);
            command.CommandText = "spGetUserLogin";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Create generic command
        private static SqlCommand CreateCommand(SqlConnection con, string text)
        {
            SqlCommand command = new SqlCommand();
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // Read All Countries
        public static List<Country> GetAllCountries()
        {
            SqlConnection con = Connect();
            SqlCommand command;
            command = CreateCommand(con, "spGetAllCountries");
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<Country> countries = new List<Country>();

            while (dr.Read())
            {
                string code = dr["Code"].ToString();
                string name = dr["Name"].ToString();
                int id = Convert.ToInt32(dr["Id"]);
                countries.Add(new Country(id, name, code));
            }

            con.Close();
            return countries;
        }

        // Read Data for the bar chart
        public static List<Country> DataForBarChart(string category_code, string flow, int year, List<Country> countrieSelected)
        {
            List<Country> countries = new List<Country>();
            string textSP = "";

            if (flow == "Export") textSP = "spExportDataForBarChart";
            else textSP = "spImportDataForBarChart";

            for (int i = 0; i < countrieSelected.Count(); i++)
            {
                SqlConnection con = Connect();
                SqlCommand command = CreateCommandBarChart(con, textSP, category_code, year,countrieSelected[i].Code);
                SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
                if (!dr.HasRows) continue;
                dr.Read();
                float sum_values_of_product = Convert.ToSingle(dr["Sum values in year"]);
                countries.Add(new Country(countrieSelected[i].Code, sum_values_of_product));
                con.Close();
            }
            return countries;


            //SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            //List<Country> countries = new List<Country>();

            //while (dr.Read())
            //{
            //    string code = dr["Code"].ToString();
            //    string name = dr["Name"].ToString();
            //    int id = Convert.ToInt32(dr["Id"]);
            //    float sum_values_of_product = Convert.ToSingle(dr["sum_values_of_product"]);
            //    string sum_values_of_productColor = "hsl(208, 70%, 50%)";
            //    countries.Add(new Country(id, name, code, sum_values_of_product, sum_values_of_productColor));
            //}

            //con.Close();
            //return countries;
        }

        // Read Data for the line chart
        public static List<Country> DataForLineChart(string category_id, string flow, List<Country> countrieSelected)
        {
            List<Country> countries = new List<Country>();
            string textSP = "";

            if (flow == "Export") textSP = "spExportDataForLineChart";
            else textSP = "spImportDataForLineChart";

            for (int i = 0; i < countrieSelected.Count(); i++)
            {
                SqlConnection con = Connect();
                SqlCommand command = CreateCommandLineChart(con, textSP, category_id, countrieSelected[i].Code);
                SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
                int country_id = countrieSelected[i].Id;
                string code = countrieSelected[i].Code;
                string name = countrieSelected[i].Name;
                int year = 0;
                List<Point> values_per_year = new List<Point>();
                while (dr.Read())
                {
                    year = Convert.ToInt32(dr["TIME"]);
                    float sum_values_of_product = Convert.ToSingle(dr["Sum values of product"]);
                    Point p = new Point(year, sum_values_of_product);
                    values_per_year.Add(p);
                }
                countries.Add(new Country(country_id, name, code, values_per_year));
                con.Close();
            }
            return countries;
        }

        //Read Data for Geo Chart.
        public static List<Country> DataForGeoChart(List<Product> productsSelected, string flow, int year)
        {
            List<Country> countries = new List<Country>();
            string textSP = "";

            if (flow == "Export") textSP = "spExportDataForGeoChart";
            else textSP = "spImportDataForGeoChart";

            for (int i = 0; i < productsSelected.Count(); i++)
            {
                SqlConnection con = Connect();
                SqlCommand command = CreateCommandGeoChart(con, textSP, productsSelected[i].Code, year);
                SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
                string productCode = productsSelected[i].Code;
                string couISO = "";
                float sum_values_of_product = 0;
                while (dr.Read())
                {
                    couISO = dr["COU"].ToString();
                    sum_values_of_product = Convert.ToSingle(dr["total_Sum"]);
                    Country c = new Country(couISO, sum_values_of_product);
                    //If the country already exist we just add the sum of the specific product.
                    if (countries.Contains(c))
                        countries[countries.IndexOf(c)].Sum += sum_values_of_product;
                    
                    else countries.Add(c);      
                }
                con.Close();
            }
            return countries;
        }

        // create command for Pie chart
        private static SqlCommand CreateCommand(SqlConnection con, string text, string cou, int year, string ind)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@countryISO", cou);
            command.Parameters.AddWithValue("@ind", ind);
            command.Parameters.AddWithValue("@year", year);
            command.CommandText = text;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            return command;
        }

        // connect 
        private static SqlConnection Connect()
        {
            // read the connection string from the web.config file
            string connectionString = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;

            // create the connection to the db
            SqlConnection con = new SqlConnection(connectionString);

            // open the database connection
            con.Open();

            return con;
        }
    }
}