using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server_side.Models
{
    public class Trade
    {
        long tradeId;
        string couISO;
        string parISO;
        string indicator;
        int year;
        float value;

        public Trade() { }

        public Trade(string couISO, string parISO, string indicator, int year, float value, long tradeId)
        {
            this.CouISO = couISO;
            this.ParISO = parISO;
            this.Indicator = indicator;
            this.Year = year;
            this.Value = value;
            this.id = tradeId;

        }

        public string CouISO { get => couISO; set => couISO = value; }
        public string ParISO { get => parISO; set => parISO = value; }
        public string Indicator { get => indicator; set => indicator = value; }
        public int Year { get => year; set => year = value; }
        public float Value { get => value; set => this.value = value; }
        public long id { get => tradeId; set => this.tradeId = value; }

        // Read by country and flow
        public List<Trade> ReadTrades(string couISO, char flow)
        {
            return DBservices.ReadByCOU(couISO, flow);
        }

        // Read by country and year.
        public List<Trade> ReadTrades(string couISO, char flow, int year)
        {
            return DBservices.ReadByCOU(couISO, flow, year);
        }

        // Read by ind
        public List<Trade> ReadTradesByInd(string ind)
        {
            return DBservices.ReadTradesByInd(ind);
        }

        // Read by ind and year.
        public List<Trade> ReadTradesByIndAndYear(string ind, int year)
        {
            return DBservices.ReadTradesByIndAndYear(ind, year);
        }

        // Read by ind, year and percentage
        public List<Trade> ReadTradesByIndYearAndPercentage(string ind, int year, int percentage)
        {
            return DBservices.GetByIndYearAndPercentage(ind, year, percentage);
        }

        public List<Trade> ReadTrades(string couISO, char flow, int year, string ind)
        {
            return DBservices.ReadByCOU(couISO, flow, year, ind);
        }

        // Read with couISO and parISO
        public List<Trade> ReadTrades(string couISO, string parISO)
        {
            return DBservices.ReadByCOUandPAR(couISO, parISO);
        }

        // Read with couISO, parISO and IND
        public List<Trade> ReadTrades(string couISO, string parISO, string indicator)
        {
            return DBservices.ReadByCouParAndIND(couISO, parISO, indicator);
        }

        // Read with couISO, parISO and year
        public List<Trade> ReadTrades(string couISO, string parISO, int year)
        {
            return DBservices.ReadByCouParAndYear(couISO, parISO, year);
        }

        // Read with couISO, parISO IND and year
        public Trade ReadTrades(string couISO, string parISO, string indicator, int year)
        {
            return DBservices.ReadByCouParYearAndIND(couISO, parISO, indicator, year);
        }

        // Read with year
        public List<Trade> ReadTradesByYear(int year)
        {
            return DBservices.ReadByYear(year);
        }

        // Read with couISO, IND, Flow
        public List<Trade> ReadTradesByCouParInd(string couISO, string ind, char flow)
        {
            return DBservices.ReadByCouParInd(couISO, ind, flow);
        }

        // Read top 10 trades
        public List<Trade> ReadTop10Trades()
        {
            return DBservices.ReadTop10Trades();
        }

        // Read all trades count
        public int GetAllTradesCount()
        {
            return DBservices.GetAllTradesCount();
        }
    }     
}