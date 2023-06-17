using Server_side.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server_side.Controllers
{
    public class TradesController : ApiController
    {

        // GET COU + FLOW
        public List<Trade> Get(string couISO, char flow)
        {
            Trade trade = new Trade();
            return trade.ReadTrades(couISO, flow);
        }

        // GET by IND 
        public List<Trade> Get(string ind)
        {
            Trade trade = new Trade();
            return trade.ReadTradesByInd(ind);
        }

        // GET COU/PAR + YEAR
        public List<Trade> Get(string couISO, char flow, int year)
        {
            Trade trade = new Trade();
            return trade.ReadTrades(couISO,flow, year);
        }

        // GET IND + YEAR
        public List<Trade> GetByIndAndYear(string ind, int year)
        {
            Trade trade = new Trade();
            return trade.ReadTradesByIndAndYear(ind, year);
        }


        // GET IND + YEAR + Percentage
        public List<Trade> GetByIndYearAndPercentage(string ind, int year, int percentage)
        {
            Trade trade = new Trade();
            return trade.ReadTradesByIndYearAndPercentage(ind, year, percentage);
        }


        // GET COU/PAR + YEAR + IND
        public List<Trade> Get(string couISO, char flow, int year, string ind)
        {
            Trade trade = new Trade();
            return trade.ReadTrades(couISO, flow, year, ind);
        }

        // GET COU + PAR
        public List<Trade> Get(string couISO, string parISO)
        {
            Trade trade = new Trade();
            return trade.ReadTrades(couISO, parISO);
        }

        // GET COU + PAR + IND
        public List<Trade> Get(string couISO, string parISO, string ind)
        {
            Trade trade = new Trade();
            return trade.ReadTrades(couISO, parISO, ind);
        }

        // GET COU + PAR + Year
        public List<Trade> Get(string couISO, string parISO, int year)
        {
            Trade trade = new Trade();
            return trade.ReadTrades(couISO, parISO, year);
        }

        // GET COU + PAR + IND + Year
        public Trade Get(string couISO, string parISO, string ind, int year)
        {    
            Trade trade = new Trade();
            return trade.ReadTrades(couISO, parISO, ind, year);
        }

        // GET by YEAR
        public List<Trade> Get(int year)
        {
            Trade trade = new Trade();
            return trade.ReadTradesByYear(year);
        }

        // GET by COU + IND + FLOW
        public List<Trade> Get(string couISO, string ind, char flow)
        {
            Trade trade = new Trade();
            return trade.ReadTradesByCouParInd(couISO, ind, flow);
        }

        // GET Top 10 trades
        public List<Trade> Get()
        {
            Trade trade = new Trade();
            return trade.ReadTop10Trades();
        }

        // POST all the trades count
        public int Post()
        {
            Trade trade = new Trade();
            return trade.GetAllTradesCount();
        }
    }
}