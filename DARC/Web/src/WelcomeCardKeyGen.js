export class WelcomeCardSrcKeyGen {
        async generate() {
                const gmail = prompt("Enter your Gmail address:");
                if (!gmail || !gmail.includes("@gmail.com")) {
                        return "❌ Invalid Gmail";
                }
                const digits = Math.floor(1000 + Math.random() * 9000); // random 4-digit
                const DARC_KEY = "DARC#X9"; // Special system key
                return $ { gmail } - $ { digits } - $ { DARC_KEY };
        }
}