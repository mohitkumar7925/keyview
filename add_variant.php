<?php
include "include.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$menu_id=$obj['menu_id']; 
$item_variant_id=$obj['item_variant_id']; 
$variant_name=$obj['variant_name'];
$price=$obj['price']; 
$mrp=$obj['mrp'];


if($menu_id != "" ){

    $sql ="select * from menu where menu_id = '".$menu_id."'  ";
	$res = getXbyY($sql);
	$row = count($res);

    if($row>0){

        
        $sql1 ="select * from item_variants where item_variant_id = '".$item_variant_id."'  ";
        $res1 = getXbyY($sql1);
        $row1 = count($res1);

        if($row==1){

            $o1 = $factory->get_object($res1[0]['item_variant_id'],"item_variants","item_variant_id");
            
            
            
            $o1->menu_id = $menu_id;
            $o1->variant_name = $variant_name;
            $o1->price = $price;
            $o1->mrp = $mrp;

            $o1->variant_id = "0";
            $o1->type = "Variant" ;
            $o1->updated_at = todaysDate();

            $o1->is_active = "1";
            $o1->item_variant_id  =$updater->update_object($o1,"item_variants");

            

            $result['error'] ='0';
            $result['post']= $obj;
            $result['error_msg'] ='Variant Updated successfully';

        }else{

            $o2 = $factory->get_object($res[0]['menu_id'],"menu","menu_id");
            $o2->customize = 1;
            $o2->menu_id =$updater->update_object($o2,"menu");
            
            
            $o1->menu_id = $menu_id;
            $o1->variant_name = $variant_name;
            $o1->price = $price;
            $o1->mrp = $mrp;

            $o1->variant_id = "0";
            $o1->type = "Variant" ;
            $o1->created_at = todaysDate();

            $o1->is_active = "1";
            $o1->item_variant_id  =$insertor->insert_object($o1,"item_variants");
            

            $result['error'] ='0';
            $result['post']= $obj;
            $result['error_msg'] ='Variant added successfully';

        }

        
    }else{
        $result['error'] ='1';
        $result['post']= $obj;
        $result['error_msg'] ='Item not in menu found';
    }
	
}else{
	$result['error'] ='1';
	$result['post']= $obj;
	$result['error_msg'] ='Item not found';
}
echo json_encode($result);

?>