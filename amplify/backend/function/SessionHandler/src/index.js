const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
app.use(awsServerlessExpressMiddleware.eventContext());
//path = · /sessions/{sessionId}
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const sessionID = event.pathParameters.sessionId;
    const session_data = {'sessionType': "End-User", 'session-code': "User-" + sessionID};
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      },
        body: JSON.stringify(session_data),
    };
};

app.get('/sessions', function(req,res){
    const query = req.query;
    res.json({
        event: req.apiGateway.event,
        query: query
    })
});
