var twoSum = function(nums, target) {
  for(let i =0;i<nums.length;i++){
          let cur = nums[i];
          for(let j = i+1;j<nums.length;j++){
              let addNum = nums[j];
              if(cur + addNum === target ){
                  console.log(i,j)
                  return [i,j]
              }
          }
      }
};
twoSum([2,7,11,15,34,65],22)