const https = require("https");

const tags = [
  "bid-submitted",
  "email-ingestion-no-account",
  "email-ingestion-no-subscription",
  "email-ingestion-received-bc-itb",
  "email-ingestion-subscription-expired-email",
  "email-ingestion-success-no-client",
  "email-ingestion-success",
  "email-ingestion-trial-expired-email",
  "email-verification",
  "employee-verification",
  "invitation-to-bid",
  "invitation-to-bid-ghost",
  "invitation-to-bid-nda",
  "invitation-to-office",
  "invitation-to-opportunity",
  "invitation-to-prequalify-2",
  "invitation-to-prequalify-2-reminder",
  "invitation-to-renew",
  "invitation-to-renew-reminder",
  "invitation-to-review",
  "invitation-to-revise",
  "invitation-to-revise-reminder",
  "invitation-to-team",
  "opportunity-assigned-to",
  "pq-applicant-added",
  "profile-change-company",
  "profile-change-office",
  "profile-change-user",
  "referral",
  "reset-password",
  "share-rfp-to-bidder",
  "submitted-application",
  "submitted-application-revision",
  "track-feedback",
  "track-referral",
  "email-ingestion-blacklist-rejection-response",
  "om-duplicate-email",
  "om-message-added",
  "om-move-delete-assignee-followers",
  "om-move-delete-notify-opportunity-followers",
  "om-opportunity-created",
  "client-suggestions-weekly-email"
];

const requester = (type, typeVerb, tag) => {
  // Pass in the API key as an argument from the command-line
  const API_KEY = process.argv[2];

  const headers = {
    Accept: "application/json",
    "X-Postmark-Server-Token": API_KEY
  };

  const apiUrl = `https://api.postmarkapp.com/stats/outbound/${type}?tag=${tag}&fromdate=2019-04-01&todate=2019-04-30`;

  https
    .get(apiUrl, { headers }, res => {
      const { statusCode } = res;
      const contentType = res.headers["content-type"];

      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          "Invalid content-type.\n" +
            `Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", chunk => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(tag, " ", parsedData[typeVerb]);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on("error", e => {
      console.error(`Got error: ${e.message}`);
    });
};

if (!process.argv[2]) {
  console.log("Whoopsie: Pass in the API key!");
} else {
  // tags.map(t => requester("sends", "Sent", t));
  // tags.map(t => requester("opens", "Opens", t));
  // tags.map(t => requester("clicks", "Clicks", t));
  tags.map(t => requester("opens", "Unique", t));
}
