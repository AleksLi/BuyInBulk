<?php
/**
 * Created by AleksLi
 * <alex.litvinov@itdelight.com>
 */

class Itdelight_BuyInBulk_Block_Catalog_Product_View_Type_Configurable
    extends Mage_Catalog_Block_Product_View_Type_Configurable {

    /**
     * Function to get an array of all available products
     *
     * @return array
     */
    public function getProductFrontendAttributes() {

        $attributes = array();
        $options    = array();
        $currentProduct = $this->getProduct();
        $attrCodes = array();

        foreach ($this->getAllowProducts() as $product) {
            $productId  = $product->getId();

            foreach ($this->getAllowAttributes() as $attribute) {
                $productAttribute   = $attribute->getProductAttribute();
                $productAttributeId = $productAttribute->getId();

                $attributeValue     = $product->getData($productAttribute->getAttributeCode());
                if (!isset($options[$productAttributeId])) {
                    $options[$productAttributeId] = array();
                }

                if (!isset($options[$productAttributeId][$attributeValue])) {
                    $options[$productAttributeId][$attributeValue] = array();
                }
                $options[$productAttributeId][$attributeValue][] = $productId;
            }
        }

        $this->_resPrices = array(
            $this->_preparePrice($currentProduct->getFinalPrice())
        );

        foreach ($this->getAllowAttributes() as $attribute) {
            $productAttribute = $attribute->getProductAttribute();
            $attributeId = $productAttribute->getId();
            $info = array(
                'id'        => $productAttribute->getId(),
                'code'      => $productAttribute->getAttributeCode(),
                'label'     => $attribute->getLabel(),
                'options'   => array()
            );

            $prices = $attribute->getPrices();
            if (is_array($prices)) {
                foreach ($prices as $value) {
                    if(!$this->_validateAttributeValue($attributeId, $value, $options)) {
                        continue;
                    }
                    $currentProduct->setParentId(true);

                    if (isset($options[$attributeId][$value['value_index']])) {
                        $productsIndex = $options[$attributeId][$value['value_index']];
                    } else {
                        $productsIndex = array();
                    }

                    $info['options'][] = array(
                        'id'        => $value['value_index'],
                        'label'     => $value['label'],
                        'products'  => $productsIndex,
                    );
                }
            }

            if($this->_validateAttributeInfo($info)) {
                $attributes[$attributeId] = $info;
            }

        }
        return $attributes;
    }

    /**
     * Function to get one array from getProductFrontendAttributes() method
     *
     * @param $code | string
     * @return array
     */
    public function getAllAvailableProductsByAttrCode($code) {

        $availableProductsByCode = array();
        foreach($this->getProductFrontendAttributes() as $attr) {
            if (isset($attr['code']) && $attr['code'] == $code) {
                $availableProductsByCode[] =  $attr;
            }
        }
        return $availableProductsByCode[0] ;
    }


    /**
     * Function to get unique value from two arrays
     *
     * @param $arrayOne
     * @param $arrayTwo
     * @return string
     */
    public function compareArraysForMatches($arrayOne, $arrayTwo) {

        $result = array_intersect($arrayOne, $arrayTwo);

        if (count($result) != 1) {
            return 'not_available';
        }
        return implode($result);
    }


    /**
     * Get allowed attribute codes
     *
     * @return array
     */
    public function getAllowedAttrCodes() {
        $attrCodes = array();

        foreach ($this->getAllowAttributes() as $attribute) {
            $productAttribute   = $attribute->getProductAttribute();
            $attrCodes[] = $productAttribute->getAttributeCode();
        }
        return $attrCodes;
    }

}