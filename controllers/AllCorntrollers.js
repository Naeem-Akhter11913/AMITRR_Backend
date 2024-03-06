const Marks = require("../schema/allSchema");


const saveStudentScore = async (req, res) => {
    const { email, name, marks, examLanguage, id } = req.body;

    try {
        const obj = new Marks({
            id,
            name,
            email,
            totalMarks: marks,
            testLang: examLanguage,
        });

        await obj.save();

        res.status(201).send({
            status: true,
            message: "Test is completed"
        });


    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

const allStudentScore = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const examnee = await Marks.countDocuments();
        const scores = await Marks.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).send({
            success: true,
            message: 'project geted success',
            examnee,
            scores,
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

const getAll = async (req, res) => {
    const { id, email } = req.query;

    try {
        const allData = await Marks.find({ id, email });
        console.log(allData.length)

        res.status(200).send({
            status: true,
            message: "all data Fetched",
            data: allData
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
}



module.exports = { allStudentScore, saveStudentScore, getAll };