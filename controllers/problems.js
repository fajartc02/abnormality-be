const moment = require("moment");
const responseStatus = require("../functions/responseStatus");
const Problem = require("../models/problem");
const Shop = require("../models/shop");
const Department = require("../models/department");
const { v4: uuidv4 } = require("uuid");
const Line = require("../models/line");

module.exports = {
    getAllProblems: async (req, res) => {
        try {
            req.query.yearMonth = req.query.yearMonth || moment().format("YYYY-MM");
            // if (req.query.filter) {
            //     delete req.query.filter.date
            //     for (const key in req.query.filter) {
            //         const element = req.query.filter[key];
            //         if (element == 'null' || !element) continue
            //         req.query[key] = element
            //     }
            //     delete req.query.filter
            // }
            console.log(req.query, 'query')
            const problems = await Problem.getAllWithPagination(req.query);

            responseStatus.common(res, problems);
        } catch (error) {
            console.log(error);
            responseStatus.serverError(res, error);
        }
    },
    getGraphProblem: async (req, res) => {
        try {
            req.query.yearMonth = req.query.yearMonth || moment().format("YYYY-MM");
            req.query.groupBy = req.query.groupBy || "overall";
            req.query.categoryId = req.query.categoryId || null;
            let problems = await Problem.getAll(req.query);
            if (req.query.groupBy === "yearly") {
                problems = await Problem.getAllYearly(req.query);
            }

            if (req.query.groupBy == "shop") {
                const shops = await Shop.getAll();
                let responseData = {
                    series: [],
                    stacked: false,
                    colors: [],
                    categories: ["W1", "W2", "W3", "W4"],
                    legends: [],
                };

                let shopSeriesMap = shops.map((shop) => {
                    responseData.colors.push(shop.color);
                    responseData.legends.push({
                        name: shop.sname,
                        color: shop.color,
                    });
                    let container = [0, 0, 0, 0];
                    for (let i = 0; i < problems.length; i++) {
                        const element = problems[i];
                        let idxPosition = Number(element.week_id.slice(1)) - 1;
                        if (element.shop_id == shop.id) {
                            container[idxPosition] += 1;
                        }
                    }

                    let obj = {
                        name: shop.sname,
                        data: container,
                    };
                    return obj;
                });

                responseData.series = shopSeriesMap;
                responseStatus.common(res, responseData);
            } else if (req.query.groupBy == "department") {
                const departments = await Department.getAll();
                let responseData = {
                    series: [],
                    stacked: true,
                    colors: [],
                    categories: ["W1", "W2", "W3", "W4"],
                    legends: [],
                };

                let departmentSeriesMap = departments.map((department) => {
                    responseData.colors.push(department.color);
                    responseData.legends.push({
                        name: department.sname,
                        color: department.color,
                    });
                    let container = [0, 0, 0, 0];
                    for (let i = 0; i < problems.length; i++) {
                        const element = problems[i];
                        let idxPosition = Number(element.week_id.slice(1)) - 1;
                        if (element.department_id == department.id) {
                            container[idxPosition] += 1;
                        }
                    }

                    let obj = {
                        name: department.sname,
                        data: container,
                    };
                    return obj;
                });

                responseData.series = departmentSeriesMap;
                responseStatus.common(res, responseData);
            } else if (req.query.groupBy == "overall") {
                let responseData = {
                    series: [{
                        name: "Closed",
                        data: [0, 0, 0, 0],
                    },
                    {
                        name: "On Progress",
                        data: [0, 0, 0, 0],
                    },
                    {
                        name: "Delay",
                        data: [0, 0, 0, 0],
                    },
                    ],
                    stacked: true,
                    colors: ["#4FAD5B", "#F5C242", "#EA3323"],
                    categories: ["W1", "W2", "W3", "W4"],
                    legends: [],
                };
                responseData.legends = [{
                    name: "Closed",
                    color: "#4FAD5B",
                },
                {
                    name: "On Progress",
                    color: "#F5C242",
                },
                {
                    name: "Delay",
                    color: "#EA3323",
                },
                ];

                responseData.series.map((serie) => {
                    for (let i = 0; i < problems.length; i++) {
                        const problem = problems[i];
                        let conditionClosed = problem.status_id == 4;

                        let isDelay =
                            moment(problem.countermeasure_date).diff(moment(), "day") < 0;

                        let idxPosition = Number(problem.week_id.slice(1)) - 1;
                        if (serie.name == "Closed" && conditionClosed) {
                            serie.data[idxPosition] += 1;
                        } else if (
                            serie.name == "On Progress" &&
                            !conditionClosed &&
                            !isDelay
                        ) {
                            serie.data[idxPosition] += 1;
                        } else if (serie.name == "Delay" && isDelay && !conditionClosed) {
                            serie.data[idxPosition] += 1;
                        }
                    }
                    return serie;
                });

                responseStatus.common(res, responseData);
            } else if (req.query.groupBy == "yearly") {
                let responseData = {
                    series: [{
                        name: "Closed",
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        name: "On Progress",
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        name: "Delay",
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    ],
                    stacked: true,
                    colors: ["#4FAD5B", "#F5C242", "#EA3323"],
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    legends: [],
                };
                responseData.legends = [{
                    name: "Closed",
                    color: "#4FAD5B",
                },
                {
                    name: "On Progress",
                    color: "#F5C242",
                },
                {
                    name: "Delay",
                    color: "#EA3323",
                },
                ];

                responseData.series.map((serie) => {
                    for (let i = 0; i < problems.length; i++) {
                        const problem = problems[i];
                        let conditionClosed = problem.status_id == 4;

                        let isDelay =
                            moment(problem.countermeasure_date).diff(moment(), "day") < 0;

                        // let idxPosition = Number(problem.week_id.slice(1)) - 1;
                        // if (serie.name == "Closed" && conditionClosed) {
                        //     serie.data[idxPosition] += 1;
                        // } else if (
                        //     serie.name == "On Progress" &&
                        //     !conditionClosed &&
                        //     !isDelay
                        // ) {
                        //     serie.data[idxPosition] += 1;
                        // } else if (serie.name == "Delay" && isDelay && !conditionClosed) {
                        //     serie.data[idxPosition] += 1;
                        // }
                    }
                    return serie;
                });

                responseStatus.common(res, responseData);
            }
        } catch (error) {
            console.log(error);
            responseStatus.serverError(res, error);
        }
    },
    getProblemById: async (req, res) => {
        try {
            const problem = await Problem.getById(req.params.id);
            responseStatus.common(res, problem);
        } catch (error) {
            console.log(error);
            responseStatus.serverError(res, error);
        }
    },
    addProblem: async (req, res) => {
        try {
            req.body.uuid = uuidv4();

            const selectedLine = await Line.getById(req.body.line_id);
            req.body.shop_id = selectedLine.shop_id;

            await Problem.create(req.body);
            responseStatus.common(res, "ok");
        } catch (error) {
            console.log(error);
            responseStatus.serverError(res, error);
        }
    },
    updateProblem: async (req, res) => {
        try {
            console.log(req.body);

            await Problem.update(req.params.id, req.body);
            responseStatus.common(res, "ok");
        } catch (error) {
            console.log(error);
            responseStatus.serverError(res, error);
        }
    },
    removeProblem: async (req, res) => {
        try {
            await Problem.delete(req.params.id);
            responseStatus.common(res, "ok");
        } catch (error) {
            console.log(error);
            responseStatus.serverError(res, error);
        }
    },
};