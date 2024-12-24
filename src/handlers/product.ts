import { Request, RequestHandler, Response } from 'express';
import Product from '../models/Product.model';

export const getProduct: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const products = await Product.findAll({
			order: [['id', 'DESC']],
		});

		res.json({ data: products });
	} catch (error) {
		console.log(error);
	}
};

export const getProductID: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const product = await Product.findByPk(id);
		if (!product) {
			res.status(404).json({ error: 'Producto no encontrado' });
		}

		res.json({ data: product });
	} catch (error) {
		console.log(error);
	}
};

export const createProduct: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json({ product: product });
	} catch (error) {
		res.status(404).json({ errors: error });
	}
};

export const updateProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;

	try {
		const product = await Product.findByPk(id);
		if (!product) {
			res.status(404).json({ error: 'Producto no encontrado' });
		}
		await product?.update(req.body);
		await product?.save();
		res.status(200).json({ data: product });
	} catch (error) {
		res.status(404).json({ error: 'Error al actualizar el producto' });
	}
};

export const updateAvailability = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const product = await Product.findByPk(id);
		if (product) {
			product.availability = !product.dataValues.availability;
			await product?.save();

			res.status(200).json({ data: product });
		} else {
			res.status(404).json({ error: 'Producto no encontrado' });
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;

	try {
		const product = await Product.findByPk(id);

		if (!product) {
			res.status(404).json({ error: 'Producto no encontrado' });
			return; // Detenemos la ejecución aquí
		}

		await product.destroy();
		res.json({ data: 'Producto eliminado' });
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar el producto' });
	}
};
