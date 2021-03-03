import {Table} from "semantic-ui-react";
import {currency} from "../../app/numberFormats";

export default function ProductsTable({products}) {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {products.map(product => (
                    <Table.Row key={product.id}>
                        <Table.Cell>{product.id}</Table.Cell>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{currency.format(product.price || 0)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}