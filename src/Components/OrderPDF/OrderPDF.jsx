import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const OrderPDF = ({ order }) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      textAlign: 'center'
    },

    header: {
      backgroundColor: '#E4E4E4',
      padding: 20,
      gap: 10
    },

    sectionInfo: {
      padding: 20,
      flexDirection: 'row',
    },

    info: {
      width: '50%',
      backgroundColor: '#E4E4E4',
      fontSize: 12,
      gap: 5,
      padding: 10,
    },

    sectionItems: {
      padding: 10,
    },

    itemRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 5,
      marginVertical: 5,
      fontSize: 12
    }
  });

  // Create Document Component
  return (
    order &&
    (
      < Document >
        <Page size="A4" style={styles.page}>

          <View style={styles.header}>
            <Text>Order Number: {order._id}</Text>
            <Text>Date: {order.createdAt.slice(0, 10)}</Text>
            <Text>TOTAL: ${order.total}</Text>
          </View>

          <View style={styles.sectionInfo}>
            <View style={styles.info}>
              <Text>Name: {order.user?.name}</Text>
              <Text>Phone: {order.user?.phone}</Text>
              <Text>Email: {order.user?.email}</Text>
            </View>
            <View style={styles.info}>
              <Text>Delivery: {order.deliveryOptions}</Text>
              <Text>Address: {order.deliveryAddress}</Text>
              <Text>Payment: {order.paymentOptions}</Text>
            </View>
          </View>

          <View style={styles.sectionItems}>
            <Text>ITEMS ORDERED</Text>
            <View style={[styles.itemRow, { backgroundColor: '#808080' }]}>
              <Text>Quantity</Text>
              <Text>Description</Text>
              <Text>Unit Price</Text>
              <Text>Subtotal</Text>
            </View>
            {order.items.map((item) => {
              return (
                <View key={item.product._id} id={item.product._id} style={styles.itemRow}>
                  <Text>{item.qty}</Text>
                  <Text>{item.product.name} - {item.product.brand}</Text>
                  <Text>${item.product.price}</Text>
                  <Text>${item.product.price * item.qty}</Text>
                </View>
              )
            })}
          </View>
        </Page>
      </Document >
    )
  );
}

export default OrderPDF