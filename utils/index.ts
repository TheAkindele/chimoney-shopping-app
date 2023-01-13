import { ICurrencyFormat } from "./interfaces"
import cogoToast from "cogo-toast";

export const formatCurrency = ({amount, currency}: ICurrencyFormat) => {
	if (amount !== "") {
		const formattedNumber = new Intl.NumberFormat('en-US', 
		{style: "currency", currency: currency }).format(parseInt(String(amount)!))
		return formattedNumber
	}
	else ""
}

export const showToast = (
	message: string,
	type: "success" | "info" | "loading" | "warn" | "error"
) => {
	switch (type) {
		case "success":
			cogoToast.success(message, { position: "top-right" });
			break;
		case "info":
			cogoToast.info(message, { position: "top-right" });
			break;
		case "loading":
			cogoToast.loading(message, { position: "top-right" });
			break;
		case "warn":
			cogoToast.warn(message, { position: "top-right" });
			break;
		case "error":
			cogoToast.error(message, { position: "top-right" });
			break;

		default:
			cogoToast.info(message, { position: "top-right" });
			break;
	}
};