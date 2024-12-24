import 'dotenv/config';

import colors from 'colors';
import server from './server';

const PORT = process.env.PORT ?? 3000;
server.listen(3000, () => {
	console.log(
		colors.green.bold(
			`Escuchando desde el puerto http://localhost:${PORT}/api/products`
		)
	);
});
