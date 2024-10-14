const Option=require('../models/options.js');
const Question= require('../models/questions.js');
module.exports.create = async function(request, respond){
    // in this we will create the options to the od given question
    console.log(request.body, request.params.id);
    const opt = await Option.create({
        option: request.body.content,
        question: request.params.id,
    })
    // it is for adding the vote to option of the id that is given by mongodb by update quesry and using the string interpolition
    const updateOpt = await Option.findByIdAndUpdate(opt._id, {"add_vote": `http://localhost:1024/api/v1/options/${opt._id}/add_vote`});

    updateOpt.save();
    // now searching thee question so that we can append the option in question---> option array
    const ques = await Question.findById(request.params.id);

    if(ques){
        ques.options.push(updateOpt);
        ques.save();
        console.log(ques);
        respond.send(ques);
    }
    else{
        respond.send('question does not exists');
    }
}

module.exports.add_vote = async function(request, respond){
    // in this votes will be added to the particular option of the question
    console.log(request.params.id);
    // this the increment query in which the vote is increment by one
    const opt = await Option.findByIdAndUpdate(request.params.id, { $inc: { vote: 1 }})
        if(opt){
            await opt.save();
            console.log(opt);
            respond.send(opt);
        }
        // handling the bad requests
        else{
            respond.send('option does not exists');
        }

}


module.exports.delete = async function (req, res) {
    try {
        // Get and sanitize the id
        const optionId = req.params.id.trim();

        // Validate the id
       // if (!mongoose.Types.ObjectId.isValid(optionId)) {
       //     return res.status(400).send('Invalid Option ID');
        //}

        // Find the option by id
        const opt = await Option.findById(optionId);
        console.log(opt)

        if (opt) {
            const quesId = opt.question;

            // Find the related question and remove the option from its options array
            const ques = await Question.findByIdAndUpdate(quesId, { 
                $pull: { options: optionId } 
            });

            // Delete the option
            await Option.findByIdAndDelete(optionId);

            console.log(ques);  // For debugging purposes
            return res.status(200).send('Option deleted successfully');
        } else {
            return res.status(404).send('Option not found');
        }
    } catch (err) {
        console.log('Error:', err);
        return res.status(500).send('An error occurred');
    }
};