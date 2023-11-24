function Cart() {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4" >
                Carrinho de compras
            </h1>

            <section className="flex items-center justify-between border-b-2 border-gray-300">
                <img
                    src="https://cdn.leroymerlin.com.br/products/fone_de_ouvido_bluetooth_tah5205bk_00_branco_philips_1567897280_a0c7_600x600.jpg"
                    alt="Logo do produto"
                    className="w-28" />

                <strong>Preço R$ 1.000,00</strong>

                <div className="flex items-center justify-center gap-3">
                    <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                        -
                    </button>
                    1
                    <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                        +
                    </button>
                </div>

                <strong className="float-right">
                    Subtotal: R$ 1.000,00
                </strong>
            </section>

            <p className="font-bold mt-4 text-right">
                Total: R$ 1.000,00
            </p>
        </div>
    )
}

export default Cart