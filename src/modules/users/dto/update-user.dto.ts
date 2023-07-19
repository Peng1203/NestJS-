import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// 继承创建用户的 Dto 校验字段 且都为可选字段
// PickType() 函数通过挑出输入类型的一组属性构造一个新的类型（类）
export class UpdateUserDto extends PartialType(CreateUserDto) {}

/** 
当构造输入验证类型（也称为 DTO ）时，你往往会在同一个类型上构造 创建 和 更新 变种。举个例子， 创建 变种可能要求全部的字段都被填写，但是 更新 变种可能会把全部的字段变成可选的。

Nest 提供了 PartialType() 函数来让这个任务变得简单，同时也可以减少样板代码
*/

// PickType() 函数通过挑出输入类型的一组属性构造一个新的类
// 选中原类型的一些字段生成新的类
export class UpdateUserStatusDto extends PickType(CreateUserDto, [
  'userStatus',
] as const) {}

// OmitType() 函数通过挑出输入类型中的全部属性，然后移除一组特定的属性构造一个类型
// 与 PickType 方法想法 排除选中的属性 将剩下的属性生成新的类 比较常见的一些应用场景
//
class Test extends OmitType(CreateUserDto, ['userName']) {}

// IntersectionType() 函数将两个类型合并成一个类型

class A {
  name: string;
}

class B {
  age: number;
}

class C extends IntersectionType(A, B) {}

// 这些映射类型函数是可以组合的
export class UpdateUserDto1 extends PartialType(
  OmitType(CreateUserDto, ['userStatus'] as const),
) {}
